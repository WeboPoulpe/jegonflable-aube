import type { MetadataRoute } from "next";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, priority: 1.0 },
    { url: `${baseUrl}/jeux`, priority: 0.9 },
    { url: `${baseUrl}/devis`, priority: 0.9 },
    { url: `${baseUrl}/a-propos`, priority: 0.7 },
    { url: `${baseUrl}/contact`, priority: 0.7 },
    { url: `${baseUrl}/mentions-legales`, priority: 0.3 },
    { url: `${baseUrl}/politique-confidentialite`, priority: 0.3 },
  ];

  // TODO STAGIAIRE [BUG-21] : compléter le sitemap avec les fiches jeu dynamiques.
  // 1. Récupère depuis la DB tous les jeux publiés (db.game.findMany avec where: { isPublished: true })
  // 2. Pour chaque jeu, ajoute une entrée { url: `${baseUrl}/jeux/${jeu.slug}`, priority: 0.6 }
  // 3. Concatène avec staticPages avant le return
  // BUG-21
  const dynamicPages: MetadataRoute.Sitemap = [];

  return [...staticPages, ...dynamicPages];
}
