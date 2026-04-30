// =========================================
// Next.js Instrumentation Hook
// =========================================
// Ce fichier est exécuté UNE SEULE FOIS au
// démarrage du serveur Next.js (dev + prod).
// On l'utilise pour forcer le chargement de
// lib/db.ts au boot, ce qui déclenche le
// console.log d'onboarding étape 2.
// =========================================

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("@/lib/db");
  }
}
