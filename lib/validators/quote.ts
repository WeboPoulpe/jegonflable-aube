import { z } from "zod";

// =========================================
// Validation d'un devis client
// =========================================

const quoteItemSchema = z.object({
  gameId: z.string().min(1, "Jeu requis"),
  days: z
    .number()
    .int()
    .min(1, "Au moins 1 jour de location"),
});

export const quoteSchema = z.object({
  customerName: z
    .string()
    .min(2, "Nom trop court")
    .max(100, "Nom trop long"),
  customerEmail: z
    .string()
    .min(1, "Email requis")
    .email("Email invalide"),
  customerPhone: z
    .string()
    .min(10, "Numéro de téléphone invalide")
    .regex(/^[0-9 +().-]+$/, "Numéro de téléphone invalide"),
  customerAddress: z
    .string()
    .min(5, "Adresse trop courte")
    .max(255),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  message: z.string().max(1000).optional(),
  items: z
    .array(quoteItemSchema)
    .min(1, "Sélectionne au moins un jeu"),
});
// BUG-05 : il manque un .refine() pour vérifier que endDate >= startDate.
// Conséquence : un client peut soumettre un devis avec une date de fin
// AVANT la date de début (ex: 15/06 → 10/06). Le calcul des jours plante
// ou renvoie un nombre négatif.

export type QuoteInput = z.infer<typeof quoteSchema>;
