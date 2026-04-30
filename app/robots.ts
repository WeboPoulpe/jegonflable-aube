import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // TODO STAGIAIRE [BUG-22] : interdire l'accès aux pages admin et API privées.
      // Ajoute un champ `disallow` qui liste les chemins à ne PAS crawler :
      // - "/admin"
      // - "/api"
      // - "/onboarding"
      // - "/login"
      // BUG-22
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
