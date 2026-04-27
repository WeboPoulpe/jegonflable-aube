// ===============================================
// Configuration des étapes d'onboarding
// "Chasse au trésor" pour le stagiaire
// ===============================================
//
// 5 énigmes "code" rapides + 4 étapes "métier" longues
// (DB, Git, Vercel, Brevo) qui prennent 1-2 jours.
//
// Difficulté → couleur de l'étape sur l'accueil onboarding.

export type StepDifficulty = "facile" | "moyen" | "long";

export interface OnboardingStep {
  n: number;
  title: string;
  emoji: string;
  description: string;
  expectedCode: string;
  hints: string[];
  skillTaught: string;
  difficulty: StepDifficulty;
  estimatedTime: string;
  /** Si défini, lien vers un guide markdown dans /docs */
  guideUrl?: string;
  /** Si true, l'étape demande au stagiaire d'aller chercher un fichier précis sur le disque */
  requiresFsCheck?: boolean;
}

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    n: 1,
    title: "Lis ta mission",
    emoji: "📖",
    description:
      "Bienvenue stagiaire ! Avant de toucher au code, ouvre le fichier README.md à la racine du projet et lis attentivement la section « Ta mission ». Un mot y est écrit en MAJUSCULES, c'est ton premier code d'accès.",
    expectedCode: "JEGONFLABLE",
    hints: [
      "Tout est écrit dans le README. Lis attentivement.",
      "Section « Ta mission » du README, premier paragraphe.",
      "Le mot en MAJUSCULES dans la première phrase. Indice : c'est le nom du projet.",
    ],
    skillTaught: "Lire la doc avant de coder.",
    difficulty: "facile",
    estimatedTime: "5 min",
  },
  {
    n: 2,
    title: "Le murmure du terminal",
    emoji: "💻",
    description:
      "Quand tu lances `npm run dev`, ton terminal affiche plein de messages. L'un d'eux, posé là par WEBOMAX, te donne un code secret. Regarde bien la console au démarrage du serveur.",
    expectedCode: "PRISMA42",
    hints: [
      "Le terminal te parle quand tu lances le projet.",
      "Quand Prisma s'initialise, il affiche quelque chose dans la console.",
      "Regarde le fichier `lib/db.ts` : un console.log mentionne le code de l'étape.",
    ],
    skillTaught: "Lire les logs serveur, comprendre le pattern singleton Prisma.",
    difficulty: "facile",
    estimatedTime: "10 min",
  },
  {
    n: 3,
    title: "Le secret du jardinier",
    emoji: "🌱",
    description:
      "Avant de pouvoir tester ton site, il a fallu y « planter » des données initiales (jeux gonflables, comptes admin). Cette opération s'appelle le seed. Trouve le fichier qui le fait et lis attentivement ses commentaires.",
    expectedCode: "SEEDMASTER",
    hints: [
      "Avant de pouvoir tester, il a fallu « planter » des données. Cherche le fichier qui le fait.",
      "Dossier `prisma/`, fichier `seed.ts`.",
      "Tout en haut du fichier, il y a un commentaire avec une 🔑.",
    ],
    skillTaught: "Comprendre le rôle du seed Prisma.",
    difficulty: "facile",
    estimatedTime: "10 min",
  },
  {
    n: 4,
    title: "L'œil du designer",
    emoji: "🔍",
    description:
      "Va sur la page d'accueil du site. Fais clic-droit sur le grand titre puis « Inspecter ». Le HTML caché contient un attribut HTML inhabituel sur le titre principal : c'est ton 4e code.",
    expectedCode: "BLEU3DA9FC",
    hints: [
      "Sur la page d'accueil, fais clic-droit > Inspecter sur le grand titre.",
      "Le `<h1>` a un attribut HTML qui ne sert à rien d'habituel.",
      "Cherche un attribut commençant par `data-`.",
    ],
    skillTaught: "DevTools navigateur, attributs data-* HTML.",
    difficulty: "facile",
    estimatedTime: "10 min",
  },
  {
    n: 5,
    title: "Ton premier bug",
    emoji: "🐛",
    description:
      "Tu es prêt pour ta vraie mission ! Sur le site, regarde bien le pied de page (en bas de chaque page). Un mot est mal orthographié dans les liens « Mentions léga... ». Trouve la faute, corrige-la dans le code, recharge la page... et le code apparaîtra ici.",
    expectedCode: "PREMIERPAS",
    hints: [
      "Cherche un mot mal orthographié dans le pied de page du site.",
      "C'est dans `components/public/Footer.tsx`, autour des liens légaux.",
      "Une lettre manque à « légales ».",
    ],
    skillTaught: "Méthodologie de debug : repérer, corriger, vérifier.",
    difficulty: "moyen",
    estimatedTime: "20 min",
  },

  // ============================================
  // GROSSES ÉTAPES "MÉTIER" (1-2 jours chacune)
  // ============================================

  {
    n: 6,
    title: "Brancher la base de données",
    emoji: "🐘",
    description:
      "Le site est censé afficher des jeux gonflables, mais ils sont stockés dans une base de données qui n'existe pas encore ! Ta mission : créer un compte gratuit chez Neon (PostgreSQL gérée), créer ta première base, lancer la migration Prisma puis le seed pour planter les 8 jeux. Suis le guide pas-à-pas dans `docs/SETUP_DB.md`. À la fin, lance `npm run db:seed` : si tu vois « 🎉 Seed terminé ! » dans le terminal, ton code apparaît à la dernière ligne du log.",
    expectedCode: "NEONLIGHT",
    hints: [
      "Lis le guide complet `docs/SETUP_DB.md` AVANT de commencer.",
      "Ordre exact : 1) Compte Neon 2) Coller DATABASE_URL dans `.env.local` 3) `npm run db:push` 4) `npm run db:seed`",
      "Si tu as une erreur « Environment variable not found: DATABASE_URL » : c'est qu'il y a une typo quelque part. Cherche bien dans le code (un BUG des 40 t'attend ici 👀).",
    ],
    skillTaught: "Setup d'une DB cloud, migrations Prisma, debug des variables d'env.",
    difficulty: "long",
    estimatedTime: "1 jour",
    guideUrl: "/docs/SETUP_DB.md",
  },

  {
    n: 7,
    title: "Versionner avec Git",
    emoji: "🌿",
    description:
      "Un dev pro ne perd jamais son travail. Ta mission : initialiser Git dans le projet, créer un compte GitHub, créer un repo `jegonflable-aube`, faire ton premier commit (« first commit ») et pousser le code sur GitHub. Suis le guide `docs/SETUP_GIT.md`. Quand ton repo est en ligne sur github.com, le code de l'étape est dans la description de ton premier commit (que je t'aurai dit d'écrire).",
    expectedCode: "GITHUB42",
    hints: [
      "Suis le guide `docs/SETUP_GIT.md`. Toutes les commandes sont dedans.",
      "Ordre : `git init` → `git add .` → `git commit -m \"...\"` → créer le repo sur GitHub → `git remote add origin ...` → `git push -u origin main`.",
      "Le message exact de ton premier commit doit être : `🚀 first commit — code: GITHUB42`. Recopie-le exactement, virgules et emoji compris.",
    ],
    skillTaught: "Git basics, GitHub, premier workflow de versioning.",
    difficulty: "long",
    estimatedTime: "1 jour",
    guideUrl: "/docs/SETUP_GIT.md",
  },

  {
    n: 8,
    title: "Mettre le site en ligne (Vercel)",
    emoji: "🚀",
    description:
      "Un site web qui tourne sur ton ordi ne sert à personne. Mission : déployer sur Vercel (gratuit). Crée un compte, connecte ton repo GitHub, configure les variables d'environnement (DATABASE_URL, NEXTAUTH_SECRET, etc.) et lance le déploiement. Suis `docs/SETUP_VERCEL.md`. Quand ton site est en ligne, va sur l'URL `/api/onboarding/vercel-check` (sur ton domaine Vercel, pas en local) : tu y trouveras le code de l'étape.",
    expectedCode: "VERCELONLINE",
    hints: [
      "Suis le guide `docs/SETUP_VERCEL.md` étape par étape.",
      "Tu dois importer ton repo GitHub dans Vercel, puis dans Settings → Environment Variables, copier toutes les variables de ton `.env.local`.",
      "L'URL de ton site sera quelque chose comme `https://jegonflable-aube-xxx.vercel.app`. La route `/api/onboarding/vercel-check` ne marche que si `VERCEL=1`, donc PAS en local.",
    ],
    skillTaught: "CI/CD basique, déploiement Vercel, variables d'environnement en prod.",
    difficulty: "long",
    estimatedTime: "1 jour",
    guideUrl: "/docs/SETUP_VERCEL.md",
  },

  {
    n: 9,
    title: "Configurer les emails (Brevo)",
    emoji: "📬",
    description:
      "Le site envoie des emails de devis aux clients, mais sans serveur SMTP rien ne part. Mission : crée un compte gratuit chez Brevo (ex Sendinblue), génère une clé SMTP, configure les variables `BREVO_*` dans `.env.local` ET sur Vercel. Puis va sur `/devis`, remplis le formulaire avec TON email perso, soumets-le. Si tu reçois un email de confirmation dans ta boîte, le sujet contiendra le code de l'étape. Suis `docs/SETUP_BREVO.md`.",
    expectedCode: "MAILMASTER",
    hints: [
      "Suis le guide `docs/SETUP_BREVO.md`.",
      "Ordre : 1) Compte Brevo 2) SMTP & API → SMTP → générer clé 3) Mettre dans `.env.local` ET dans Vercel 4) Redémarrer `npm run dev` 5) Tester sur /devis.",
      "Vérifie tes spams ! Brevo gratuit envoie depuis un domaine non-vérifié, l'email peut arriver dans la corbeille spam.",
    ],
    skillTaught: "SMTP, services tiers, debug d'envoi d'emails.",
    difficulty: "long",
    estimatedTime: "0.5 jour",
    guideUrl: "/docs/SETUP_BREVO.md",
  },
];

export function getStep(n: number): OnboardingStep | undefined {
  return ONBOARDING_STEPS.find((s) => s.n === n);
}

export const DIFFICULTY_LABELS: Record<StepDifficulty, string> = {
  facile: "Facile",
  moyen: "Moyen",
  long: "Long (1-2j)",
};

export const DIFFICULTY_COLORS: Record<StepDifficulty, string> = {
  facile: "bg-success/20 text-success border-success/40",
  moyen: "bg-primary/20 text-primary-700 border-primary/40",
  long: "bg-accent/30 text-orange-700 border-accent/60",
};
