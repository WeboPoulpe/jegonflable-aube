// =========================================
// Constantes métier
// =========================================

export const QUOTE_STATUSES = [
  "PENDING",
  "CONFIRMED",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
] as const;

export const QUOTE_STATUS_LABELS: Record<(typeof QUOTE_STATUSES)[number], string> = {
  PENDING: "En attente",
  CONFIRMED: "Confirmé",
  PAID: "Payé",
  IN_PROGRESS: "En cours",
  COMPLETED: "Terminé",
  CANCELLED: "Annulé",
};

export const QUOTE_STATUS_COLORS: Record<(typeof QUOTE_STATUSES)[number], string> = {
  PENDING: "bg-yellow-100 text-yellow-800 border-yellow-300",
  CONFIRMED: "bg-blue-100 text-blue-800 border-blue-300",
  PAID: "bg-green-100 text-green-800 border-green-300",
  IN_PROGRESS: "bg-purple-100 text-purple-800 border-purple-300",
  COMPLETED: "bg-gray-100 text-gray-700 border-gray-300",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
};

export const GAME_TYPES = [
  "CHATEAU",
  "PARCOURS",
  "TOBOGGAN",
  "COMBO",
  "SPORT",
  "AUTRE",
] as const;

export const GAME_TYPE_LABELS: Record<(typeof GAME_TYPES)[number], string> = {
  CHATEAU: "Château gonflable",
  PARCOURS: "Parcours d'obstacles",
  TOBOGGAN: "Toboggan",
  COMBO: "Combo (multi-fonctions)",
  SPORT: "Sport / Bubble Foot",
  AUTRE: "Autre",
};

// Pourcentage d'acompte demandé à la confirmation du devis
export const DEPOSIT_PERCENTAGE = 0.3; // 30%
