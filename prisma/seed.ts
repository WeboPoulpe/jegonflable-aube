// =========================================
// 🔑 ÉTAPE 3 — Le code est : SEEDMASTER
// =========================================
// Fichier de seed : remplit la base avec
// les données initiales (admin + jeux).
//
// Lance avec : npm run db:seed

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Démarrage du seed...");

  // -------- USERS --------
  // BUG-02 : le mot de passe est stocké en clair au lieu d'être hashé avec bcrypt.
  // Conséquence : impossible de se connecter (le check bcrypt.compare échoue).
  const adminPassword = "WebomaxAdmin2026!";

  const admin = await prisma.user.upsert({
    where: { email: "max@webomax.fr" },
    update: {},
    create: {
      email: "max@webomax.fr",
      name: "Maxime — WEBOMAX",
      password: adminPassword,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`✅ Admin créé : ${admin.email}`);

  // Compte stagiaire (mot de passe correctement hashé pour exemple)
  const stagiaireHash = await bcrypt.hash("Stagiaire2026", 10);
  await prisma.user.upsert({
    where: { email: "stagiaire@jegonflable-aube.fr" },
    update: {},
    create: {
      email: "stagiaire@jegonflable-aube.fr",
      name: "Stagiaire",
      password: stagiaireHash,
      role: "ADMIN",
    },
  });

  // -------- GAMES --------
  const games = [
    {
      slug: "chateau-licorne-magique",
      name: "Château Licorne Magique",
      type: "CHATEAU" as const,
      description:
        "Un château gonflable enchanté avec ses tours, sa licorne géante et ses étoiles scintillantes. Parfait pour les anniversaires de princesses.",
      pricePerDay: 120,
      capacity: 8,
      ageMin: 3,
      ageMax: 10,
      width: 4,
      length: 5,
      height: 3.5,
      weight: 80,
      photoUrl:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "parcours-pirates",
      name: "Parcours des Pirates",
      type: "PARCOURS" as const,
      description:
        "Un parcours d'obstacles thème pirate avec tunnels, pont mouvant et toboggan final. Sensations garanties pour les aventuriers.",
      pricePerDay: 180,
      capacity: 6,
      ageMin: 5,
      ageMax: 14,
      width: 3,
      length: 9,
      height: 3,
      weight: 110,
      photoUrl:
        "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "toboggan-geant-tropical",
      name: "Toboggan Géant Tropical",
      type: "TOBOGGAN" as const,
      description:
        "Toboggan gonflable de 6 mètres de haut, avec piscine d'arrivée. Ambiance tropicale avec palmiers gonflables. Effet wahou garanti.",
      pricePerDay: 250,
      capacity: 4,
      ageMin: 6,
      ageMax: 99,
      width: 4,
      length: 8,
      height: 6,
      weight: 180,
      photoUrl:
        "https://images.unsplash.com/photo-1581375074612-d1fd0e661aeb?w=800",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "combo-jungle-aventure",
      name: "Combo Jungle Aventure",
      type: "COMBO" as const,
      description:
        "Structure 3-en-1 : aire de saut, parcours d'obstacles ET toboggan. Thème jungle avec animaux sauvages. Le hit des grands événements.",
      pricePerDay: 290,
      capacity: 10,
      ageMin: 4,
      ageMax: 12,
      width: 5,
      length: 10,
      height: 4.5,
      weight: 200,
      photoUrl:
        "https://images.unsplash.com/photo-1553775282-20af80779df7?w=800",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "terrain-foot-bulle",
      name: "Terrain Foot Bulle",
      type: "SPORT" as const,
      description:
        "Terrain gonflable avec 2 cages pour bubble foot. Inclut 6 bubbles taille adulte. Idéal EVG, anniversaires ados et événements d'entreprise.",
      pricePerDay: 220,
      capacity: 12,
      ageMin: 12,
      ageMax: 99,
      width: 6,
      length: 12,
      height: 1.5,
      weight: 150,
      photoUrl:
        "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "chateau-classique-multicolore",
      name: "Château Classique Multicolore",
      type: "CHATEAU" as const,
      description:
        "Le grand classique. Château gonflable rouge/jaune/bleu pour les petits. Robuste, facile à installer, parfait pour les jardins.",
      pricePerDay: 90,
      capacity: 6,
      ageMin: 2,
      ageMax: 8,
      width: 3,
      length: 3,
      height: 2.5,
      weight: 60,
      photoUrl:
        "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "parcours-american-gladiator",
      name: "Parcours American Gladiator",
      type: "PARCOURS" as const,
      description:
        "Le parcours XXL : 12 mètres d'obstacles avec mur d'escalade gonflable, ring de combat, échelle infernale. Pour ados et adultes.",
      pricePerDay: 320,
      capacity: 4,
      ageMin: 12,
      ageMax: 99,
      width: 4,
      length: 12,
      height: 4,
      weight: 250,
      photoUrl:
        "https://images.unsplash.com/photo-1574107809834-9c476f1b1700?w=800",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "mini-aire-bambin",
      name: "Mini Aire Bambin",
      type: "AUTRE" as const,
      description:
        "Petite aire de jeu gonflable pour les tout-petits (1-4 ans). Sécurisée, basse, avec petits animaux gonflables. Parfaite intérieur.",
      pricePerDay: 70,
      capacity: 4,
      ageMin: 1,
      ageMax: 4,
      width: 2,
      length: 2.5,
      height: 1.2,
      weight: 35,
      photoUrl:
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800",
      isPublished: false, // Brouillon volontaire pour BUG-12
      isFeatured: false,
    },
  ];

  for (const game of games) {
    await prisma.game.upsert({
      where: { slug: game.slug },
      update: {},
      create: game,
    });
  }
  console.log(`✅ ${games.length} jeux gonflables créés`);

  // -------- SETTINGS --------
  const settings = [
    { key: "contact_email", value: "contact@jegonflable-aube.fr" },
    { key: "contact_phone", value: "06 12 34 56 78" },
    { key: "company_address", value: "12 rue des Châteaux, 10000 Troyes" },
    { key: "delivery_radius_km", value: "30" },
    { key: "delivery_price_per_km", value: "1.5" },
    { key: "deposit_percentage", value: "30" },
  ];

  for (const setting of settings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: {},
      create: setting,
    });
  }
  console.log(`✅ ${settings.length} paramètres créés`);

  console.log("\n🎉 Seed terminé !");
  console.log("\n📋 Comptes créés :");
  console.log("  - max@webomax.fr / WebomaxAdmin2026!");
  console.log("  - stagiaire@jegonflable-aube.fr / Stagiaire2026");
  console.log("\n🏆 Code étape 6 : NEONLIGHT");
}

main()
  .catch((e) => {
    console.error("❌ Erreur seed :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
