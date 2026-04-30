import Link from "next/link";
import { Star, ShieldCheck, Truck, ArrowRight } from "lucide-react";

export const dynamic = "force-dynamic";
import { db } from "@/lib/db";
import { HeroSection } from "@/components/public/HeroSection";
import { GameCard } from "@/components/public/GameCard";
import { HowItWorks } from "@/components/public/HowItWorks";
import { Testimonials } from "@/components/public/Testimonials";

export default async function HomePage() {
  const featuredGames = await db.game.findMany({
    where: { isPublished: true, isFeatured: true },
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <HeroSection />

      {/* Avantages */}
      <section className="py-16">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 md:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "100% sécurisé",
              text: "Tous nos jeux sont contrôlés et certifiés CE.",
            },
            {
              icon: Truck,
              title: "Livraison incluse",
              text: "Livraison, installation et reprise dans 30 km autour de Troyes.",
            },
            {
              icon: Star,
              title: "Note 4.9/5",
              text: "Plus de 200 familles nous font confiance chaque année.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border-2 border-primary/10 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/30">
                <item.icon className="h-7 w-7 text-accent-600" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-primary-800">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Jeux phares */}
      {featuredGames.length > 0 && (
        <section className="bg-cream py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <h2 className="mb-2 font-heading text-4xl font-bold text-primary-900">
                  Nos jeux stars
                </h2>
                <p className="text-gray-600">
                  Les plus demandés cette saison.
                </p>
              </div>
              {/* BUG-09 : le lien "Tout voir" pointe vers /jeu au lieu de /jeux.
                  Conséquence : clic → page 404 (Next.js ne trouve pas /jeu).
                  Bug visible : le visiteur clique en haut à droite et tombe sur
                  une page d'erreur. */}
              <Link
                href="/jeu"
                className="hidden items-center gap-1 rounded-full border-2 border-primary px-4 py-2 font-heading font-bold text-primary hover:bg-primary-50 sm:inline-flex"
              >
                Tout voir
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {featuredGames.map((g) => (
                <GameCard
                  key={g.id}
                  slug={g.slug}
                  name={g.name}
                  type={g.type}
                  description={g.description}
                  pricePerDay={Number(g.pricePerDay)}
                  capacity={g.capacity}
                  ageMin={g.ageMin}
                  ageMax={g.ageMax}
                  width={g.width}
                  length={g.length}
                  photoUrl={g.photoUrl}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      <HowItWorks />
      <Testimonials />

      {/* CTA temporaire pour onboarding stagiaire */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-3xl border-4 border-dashed border-accent/50 bg-accent/10 p-8 text-center">
          <h2 className="mb-2 font-heading text-2xl font-bold text-primary-800">
            👋 Stagiaire ? Commence par ton onboarding !
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            9 énigmes à résoudre avant la chasse aux 40 bugs.
          </p>
          <Link
            href="/onboarding"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-heading font-bold text-primary-900 shadow-md transition hover:scale-105"
          >
            Lancer la chasse au trésor
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
