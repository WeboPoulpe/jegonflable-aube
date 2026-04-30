"use client";

import { useState, useActionState, useMemo } from "react";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";
import { Input, Textarea } from "@/components/ui/Input";
import { formatPrice } from "@/lib/utils";
import { createQuoteAction, type QuoteFormState } from "@/actions/quotes";

interface AvailableGame {
  id: string;
  name: string;
  pricePerDay: number;
}

interface CartItem {
  gameId: string;
  days: number;
}

interface Props {
  games: AvailableGame[];
  preselectedGameId?: string;
}

const initialState: QuoteFormState = { status: "idle" };

export function QuoteForm({ games, preselectedGameId }: Props) {
  const [state, formAction, isPending] = useActionState(
    createQuoteAction,
    initialState,
  );

  const [cart, setCart] = useState<CartItem[]>(
    preselectedGameId ? [{ gameId: preselectedGameId, days: 1 }] : [],
  );

  function addItem() {
    const firstAvailable = games.find(
      (g) => !cart.some((c) => c.gameId === g.id),
    );
    if (firstAvailable) {
      setCart([...cart, { gameId: firstAvailable.id, days: 1 }]);
    }
  }

  function updateItem(index: number, patch: Partial<CartItem>) {
    setCart(cart.map((c, i) => (i === index ? { ...c, ...patch } : c)));
  }

  function removeItem(index: number) {
    setCart(cart.filter((_, i) => i !== index));
  }

  const total = useMemo(() => {
    return cart.reduce((sum, item) => {
      const game = games.find((g) => g.id === item.gameId);
      if (!game) return sum;
      // BUG-15 : le calcul du total oublie de multiplier par item.days.
      // Conséquence : un client qui loue 3 jours ne paie que 1 jour
      // dans l'estimation affichée à côté du formulaire.
      return sum + Number(game.pricePerDay);
    }, 0);
  }, [cart, games]);

  if (state.status === "success") {
    return (
      <div className="rounded-3xl border-4 border-success/30 bg-success/10 p-12 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-success" />
        <h2 className="mb-2 font-heading text-3xl font-bold text-success">
          Devis envoyé !
        </h2>
        <p className="mb-2 text-gray-700">
          Référence : <strong>{state.reference}</strong>
        </p>
        <p className="text-sm text-gray-600">
          Tu vas recevoir une confirmation par email. On te recontacte sous 24h.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-6 md:grid-cols-3">
      {/* Colonne formulaire */}
      <div className="md:col-span-2 space-y-4">
        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-heading text-xl font-bold text-primary-800">
            Tes coordonnées
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="customerName"
              label="Nom complet"
              placeholder="Marie Dupont"
              required
              error={state.status === "error" ? state.fieldErrors?.customerName : undefined}
            />
            <Input
              name="customerEmail"
              type="email"
              label="Email"
              placeholder="marie@exemple.fr"
              required
              error={state.status === "error" ? state.fieldErrors?.customerEmail : undefined}
            />
            <Input
              name="customerPhone"
              type="tel"
              label="Téléphone"
              placeholder="06 12 34 56 78"
              required
              error={state.status === "error" ? state.fieldErrors?.customerPhone : undefined}
            />
            <Input
              name="customerAddress"
              label="Adresse de livraison"
              placeholder="12 rue des Lilas, 10000 Troyes"
              required
              error={state.status === "error" ? state.fieldErrors?.customerAddress : undefined}
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-heading text-xl font-bold text-primary-800">
            Dates de location
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              name="startDate"
              type="date"
              label="Date de début"
              required
              error={state.status === "error" ? state.fieldErrors?.startDate : undefined}
            />
            <Input
              name="endDate"
              type="date"
              label="Date de fin"
              required
              error={state.status === "error" ? state.fieldErrors?.endDate : undefined}
            />
          </div>
        </div>

        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm">
          <h3 className="mb-4 flex items-center justify-between font-heading text-xl font-bold text-primary-800">
            Tes jeux
            <button
              type="button"
              onClick={addItem}
              disabled={cart.length >= games.length}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white hover:bg-primary-600 disabled:opacity-40"
            >
              <Plus className="h-3 w-3" />
              Ajouter
            </button>
          </h3>

          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">
              Clique sur « Ajouter » pour sélectionner ton premier jeu.
            </p>
          ) : (
            <div className="space-y-3">
              {cart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-end gap-3 rounded-xl border border-gray-200 p-3"
                >
                  <div className="flex-1">
                    <label className="mb-1 block text-xs font-bold text-gray-700">
                      Jeu
                    </label>
                    <select
                      value={item.gameId}
                      onChange={(e) =>
                        updateItem(idx, { gameId: e.target.value })
                      }
                      className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    >
                      {games.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name} ({formatPrice(Number(g.pricePerDay))}/j)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <label className="mb-1 block text-xs font-bold text-gray-700">
                      Jours
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={30}
                      value={item.days}
                      onChange={(e) =>
                        updateItem(idx, {
                          days: Number.parseInt(e.target.value || "1", 10),
                        })
                      }
                      className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(idx)}
                    className="rounded-lg p-2 text-error hover:bg-error/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <input type="hidden" name="items" value={JSON.stringify(cart)} />
          {state.status === "error" && state.fieldErrors?.items && (
            <p className="mt-2 text-xs font-bold text-error">
              {state.fieldErrors.items}
            </p>
          )}
        </div>

        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm">
          <Textarea
            name="message"
            label="Message (optionnel)"
            placeholder="Une question, une demande spécifique ?"
            error={state.status === "error" ? state.fieldErrors?.message : undefined}
          />
        </div>

        {state.status === "error" && !state.fieldErrors && (
          <div className="rounded-xl border-2 border-error bg-error/10 p-3 text-sm font-bold text-error">
            {state.message}
          </div>
        )}
      </div>

      {/* Colonne récap */}
      <aside className="md:col-span-1">
        <div className="sticky top-24 rounded-2xl border-2 border-primary/30 bg-white p-6 shadow-md">
          <h3 className="mb-4 font-heading text-xl font-bold text-primary-800">
            Estimation
          </h3>
          <div className="mb-4 space-y-2 border-b border-primary/10 pb-4">
            {cart.length === 0 ? (
              <p className="text-sm text-gray-500">Aucun jeu sélectionné.</p>
            ) : (
              cart.map((item, idx) => {
                const game = games.find((g) => g.id === item.gameId);
                if (!game) return null;
                return (
                  <div
                    key={idx}
                    className="flex justify-between text-sm text-gray-700"
                  >
                    <span>
                      {game.name} ×{item.days}j
                    </span>
                    <span className="font-bold">
                      {formatPrice(Number(game.pricePerDay) * item.days)}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          <div className="mb-6 flex items-end justify-between">
            <span className="font-heading text-lg font-bold text-primary-800">
              Total estimé
            </span>
            <span className="font-heading text-3xl font-bold text-primary">
              {formatPrice(total)}
            </span>
          </div>

          <button
            type="submit"
            disabled={isPending || cart.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-600 px-6 py-3 font-heading text-base font-bold text-white shadow-lg transition hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
            {isPending ? "Envoi..." : "Envoyer ma demande"}
          </button>

          <p className="mt-3 text-center text-[11px] text-gray-500">
            Prix indicatif. Le devis final tient compte de la livraison et des
            options.
          </p>
        </div>
      </aside>
    </form>
  );
}
