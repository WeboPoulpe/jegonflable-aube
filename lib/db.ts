import { PrismaClient } from "@prisma/client";

// =========================================
// 🔑 ÉTAPE 2 — Le code est : PRISMA42
// =========================================
// Ce fichier est le "singleton" Prisma.
// On ne crée qu'UNE seule instance de Prisma
// pour toute l'app, sinon on saturerait les
// connexions à la base de données en dev.
//
// Pattern recommandé par Prisma + Next.js.
// =========================================

console.log("🔑 ÉTAPE 2 — Code onboarding : PRISMA42");

declare global {
  var prisma: PrismaClient | undefined;
}

// BUG-03 : variable env mal nommée (DATBASE_URL au lieu de DATABASE_URL)
// Conséquence : Prisma ne trouve pas l'URL → erreur au premier appel DB.
const databaseUrl = process.env.DATBASE_URL;

export const db =
  globalThis.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: databaseUrl ? { db: { url: databaseUrl } } : undefined,
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
