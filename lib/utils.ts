// =========================================
// Helpers génériques
// =========================================

/**
 * Formate un prix en euros (utilise la locale FR).
 * Ex: formatPrice(120) → "120,00 €"
 */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

/**
 * Formate une date au format français court.
 * Ex: formatDateFR(new Date()) → "15/04/2026"
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function formatDateFR(date: Date | string): string {
  // TODO STAGIAIRE [BUG-07] : compléter cette fonction.
  // Elle doit retourner la date au format "JJ/MM/AAAA" en utilisant la locale fr-FR.
  // Indice : `Intl.DateTimeFormat("fr-FR", { ... }).format(d)` où d est un objet Date.
  // Si on te passe une string, convertis-la d'abord en Date avec `new Date(date)`.
  // BUG-07
  return "";
}

/**
 * Calcule le nombre de jours entre deux dates (inclusif).
 * Ex: 1 jour de location = startDate et endDate identiques → 1 jour.
 * Ex: 3 jours = lundi → mercredi → 3 jours.
 */
export function calculateRentalDays(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startDate: Date | string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endDate: Date | string,
): number {
  // TODO STAGIAIRE [BUG-08] : compléter cette fonction.
  // Elle doit retourner le nombre de jours INCLUSIFS entre startDate et endDate.
  // Indice : convertis les 2 paramètres en Date, calcule la différence en
  // millisecondes (date2 - date1), divise par (1000 * 60 * 60 * 24), arrondi
  // au-dessus avec Math.ceil et AJOUTE 1 (car on compte le premier jour).
  // BUG-08
  return 0;
}

/**
 * Génère une référence unique de devis : "JG-2026-A4F2X1"
 */
export function generateQuoteReference(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `JG-${year}-${random}`;
}

/**
 * Slugifie un nom de jeu (pour URL).
 * Ex: "Château Licorne Magique" → "chateau-licorne-magique"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "") // retire accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Concatène conditionnellement des classes Tailwind (alternative à clsx).
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}
