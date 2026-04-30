"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { quoteSchema } from "@/lib/validators/quote";
import { generateQuoteReference } from "@/lib/utils";
import {
  sendQuoteConfirmation,
  sendAdminNewQuoteNotification,
} from "@/lib/email";
import { DEPOSIT_PERCENTAGE } from "@/lib/constants";

export type QuoteFormState =
  | { status: "idle" }
  | { status: "success"; reference: string }
  | { status: "error"; message: string; fieldErrors?: Record<string, string> };

export async function createQuoteAction(
  _prevState: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  // Récupération + parsing items (encodés en JSON dans un champ caché)
  const itemsRaw = formData.get("items");
  let items: { gameId: string; days: number }[] = [];
  try {
    items = itemsRaw ? JSON.parse(itemsRaw.toString()) : [];
  } catch {
    return {
      status: "error",
      message: "Format de panier invalide.",
    };
  }

  const data = {
    customerName: formData.get("customerName")?.toString() ?? "",
    customerEmail: formData.get("customerEmail")?.toString() ?? "",
    customerPhone: formData.get("customerPhone")?.toString() ?? "",
    customerAddress: formData.get("customerAddress")?.toString() ?? "",
    startDate: formData.get("startDate")?.toString() ?? "",
    endDate: formData.get("endDate")?.toString() ?? "",
    message: formData.get("message")?.toString() ?? undefined,
    items,
  };

  const parsed = quoteSchema.safeParse(data);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path.join(".")] = issue.message;
    }
    return {
      status: "error",
      message: "Vérifie les champs en erreur.",
      fieldErrors,
    };
  }

  const input = parsed.data;

  // Récupère les jeux pour snapshot du nom + prix au moment du devis
  const games = await db.game.findMany({
    where: { id: { in: input.items.map((i) => i.gameId) } },
  });

  if (games.length !== input.items.length) {
    return {
      status: "error",
      message: "Un ou plusieurs jeux sélectionnés sont introuvables.",
    };
  }

  // Calcul des lignes
  const itemsToCreate = input.items.map((item) => {
    const game = games.find((g) => g.id === item.gameId);
    if (!game) throw new Error("Game introuvable");
    const lineTotal = Number(game.pricePerDay) * item.days;
    return {
      gameId: game.id,
      gameNameSnapshot: game.name,
      pricePerDaySnapshot: game.pricePerDay,
      days: item.days,
      lineTotal,
    };
  });

  const totalPrice = itemsToCreate.reduce((sum, i) => sum + i.lineTotal, 0);

  // BUG-18 : l'acompte est calculé en multipliant par DEPOSIT_PERCENTAGE
  // (qui vaut 0.3 = 30%) MAIS la formule a une coquille : on multiplie par
  // 30 au lieu de 0.3. Conséquence : l'acompte affiché est 100x trop grand
  // (ex: pour un total de 200€, on demande 6000€ d'acompte au lieu de 60€).
  const deposit = totalPrice * 30;

  const reference = generateQuoteReference();

  const quote = await db.quote.create({
    data: {
      reference,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      customerAddress: input.customerAddress,
      startDate: input.startDate,
      endDate: input.endDate,
      message: input.message,
      totalPrice,
      deposit,
      items: { create: itemsToCreate },
    },
  });

  // Envoi des emails (non bloquant)
  try {
    await Promise.all([
      sendQuoteConfirmation({
        to: quote.customerEmail,
        customerName: quote.customerName,
        reference: quote.reference,
        totalPrice,
      }),
      sendAdminNewQuoteNotification({
        reference: quote.reference,
        customerName: quote.customerName,
        customerEmail: quote.customerEmail,
        totalPrice,
      }),
    ]);
  } catch (e) {
    // On ne bloque pas la création du devis si l'email plante
    console.error("[quote] erreur envoi email :", e);
  }

  revalidatePath("/admin/devis");

  return { status: "success", reference };
}

// =========================================
// BUG-39 (TROU STAGIAIRE) : exporter les devis en CSV
// =========================================
export async function exportQuotesToCSV(): Promise<string> {
  // TODO STAGIAIRE [BUG-39] : implémenter l'export CSV des devis.
  // 1. Récupère tous les devis avec leurs items (db.quote.findMany avec include)
  // 2. Construis une chaîne CSV avec les colonnes :
  //    reference, status, customerName, customerEmail, startDate, endDate, totalPrice
  // 3. Échappe les virgules et guillemets dans les valeurs
  // 4. Retourne la string CSV
  // BUG-39
  return "";
}
