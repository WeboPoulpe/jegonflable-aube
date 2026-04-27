// ===============================================
// Trophées débloqués pendant l'onboarding
// ===============================================

export interface Trophy {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlockedBy: "step" | "extra";
  stepNumber?: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const TROPHIES: Trophy[] = [
  // ----- Trophées des 5 étapes "code" -----
  {
    id: "doc-reader",
    title: "Lecteur de docs",
    description: "Tu as lu la doc avant de coder. Tu es déjà au-dessus de 80% des devs.",
    emoji: "📖",
    unlockedBy: "step",
    stepNumber: 1,
    rarity: "common",
  },
  {
    id: "terminal-whisperer",
    title: "Souffleur de terminal",
    description: "Tu sais lire les logs serveur. Le terminal n'a plus de secrets pour toi.",
    emoji: "💻",
    unlockedBy: "step",
    stepNumber: 2,
    rarity: "common",
  },
  {
    id: "seed-master",
    title: "Maître jardinier",
    description: "Tu as percé le mystère du seed. Tes données fleurissent.",
    emoji: "🌱",
    unlockedBy: "step",
    stepNumber: 3,
    rarity: "rare",
  },
  {
    id: "devtools-detective",
    title: "Inspecteur du DOM",
    description: "Les DevTools sont ta loupe. Plus rien ne se cache de toi.",
    emoji: "🔍",
    unlockedBy: "step",
    stepNumber: 4,
    rarity: "rare",
  },
  {
    id: "first-bug-killer",
    title: "Tueur de bug",
    description: "Ton premier bug corrigé. Plus que 39 à chasser.",
    emoji: "🐛",
    unlockedBy: "step",
    stepNumber: 5,
    rarity: "epic",
  },

  // ----- Trophées des 4 étapes "métier" longues -----
  {
    id: "db-architect",
    title: "Architecte de bases",
    description: "Tu as connecté Neon et planté tes 8 jeux gonflables. Ta DB est vivante.",
    emoji: "🐘",
    unlockedBy: "step",
    stepNumber: 6,
    rarity: "epic",
  },
  {
    id: "git-mastermind",
    title: "Cerveau Git",
    description: "Premier repo en ligne ! Tu sauvegardes ton travail comme un pro.",
    emoji: "🌿",
    unlockedBy: "step",
    stepNumber: 7,
    rarity: "epic",
  },
  {
    id: "vercel-pilot",
    title: "Pilote Vercel",
    description: "Ton site est en ligne, accessible depuis n'importe où. Le monde est à toi.",
    emoji: "🚀",
    unlockedBy: "step",
    stepNumber: 8,
    rarity: "legendary",
  },
  {
    id: "mail-master",
    title: "Facteur du web",
    description: "Tes emails partent et arrivent. Plus aucun devis ne sera oublié.",
    emoji: "📬",
    unlockedBy: "step",
    stepNumber: 9,
    rarity: "epic",
  },

  // ----- Trophées bonus / cachés -----
  {
    id: "speed-runner",
    title: "Speedrunner",
    description: "Les 5 énigmes code en moins de 30 minutes. Chapeau bas.",
    emoji: "⚡",
    unlockedBy: "extra",
    rarity: "epic",
  },
  {
    id: "no-hint",
    title: "Sans indice",
    description: "Toutes les énigmes résolues sans dévoiler un seul indice. Légendaire.",
    emoji: "🧠",
    unlockedBy: "extra",
    rarity: "legendary",
  },
  {
    id: "perfectionist",
    title: "Perfectionniste",
    description: "Aucune erreur de saisie sur les 9 codes. Du premier coup à chaque fois.",
    emoji: "💎",
    unlockedBy: "extra",
    rarity: "legendary",
  },
  {
    id: "the-big-boss",
    title: "Le grand boss",
    description: "Toutes les étapes terminées + tous les trophées débloqués. Tu es un vrai dev.",
    emoji: "👑",
    unlockedBy: "extra",
    rarity: "legendary",
  },
];

export function getTrophyForStep(stepNumber: number): Trophy | undefined {
  return TROPHIES.find(
    (t) => t.unlockedBy === "step" && t.stepNumber === stepNumber,
  );
}

export const RARITY_COLORS: Record<Trophy["rarity"], string> = {
  common: "from-gray-300 to-gray-500",
  rare: "from-primary-400 to-primary-600",
  epic: "from-purple-400 to-pink-600",
  legendary: "from-accent to-orange-500",
};

export const RARITY_BORDER: Record<Trophy["rarity"], string> = {
  common: "border-gray-400",
  rare: "border-primary-500",
  epic: "border-purple-500",
  legendary: "border-accent-500",
};

export const RARITY_LABELS: Record<Trophy["rarity"], string> = {
  common: "Commun",
  rare: "Rare",
  epic: "Épique",
  legendary: "Légendaire",
};
