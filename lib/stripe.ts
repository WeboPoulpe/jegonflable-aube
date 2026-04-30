import Stripe from "stripe";

// =========================================
// Stripe — config minimaliste
// =========================================
// Activé uniquement si STRIPE_ENABLED=true.
// Utilisé en Phase 7 par actions/stripe.ts et
// app/api/stripe/webhook/route.ts.
// =========================================

export const STRIPE_ENABLED = process.env.STRIPE_ENABLED === "true";

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!STRIPE_ENABLED) {
    throw new Error(
      "Stripe désactivé. Mets STRIPE_ENABLED=true dans .env.local pour activer.",
    );
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY manquant dans .env.local");
  }
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2024-11-20.acacia",
    });
  }
  return stripeInstance;
}
