import { NextResponse } from "next/server";

// =========================================
// Route utilisée par l'onboarding étape 8
// (déploiement Vercel).
// Renvoie le code uniquement si la variable
// VERCEL=1 est présente (donc en prod Vercel).
// =========================================

export async function GET() {
  const isVercel = process.env.VERCEL === "1";

  if (!isVercel) {
    return NextResponse.json(
      {
        deployed: false,
        message:
          "Cette route ne marche que sur Vercel. Déploie ton site puis reviens ici sur l'URL Vercel (pas en local).",
      },
      { status: 200 },
    );
  }

  return NextResponse.json({
    deployed: true,
    code: "VERCELONLINE",
    message: "Bravo ! Ton site est en ligne sur Vercel.",
    deploymentUrl: process.env.VERCEL_URL ?? null,
  });
}
