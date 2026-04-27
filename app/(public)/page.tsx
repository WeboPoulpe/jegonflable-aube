import Link from "next/link";
import { Sparkles, ArrowRight, Star, ShieldCheck, Truck } from "lucide-react";

// Coquille minimale de la page d'accueil pour la Phase 2.
// La version complète (HeroSection, Catalogue, Témoignages, etc.)
// sera implémentée en Phase 4.

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-cream via-primary-50 to-accent/20 py-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-primary-700 shadow-sm backdrop-blur">
            <Sparkles className="h-4 w-4 text-accent-500" />
            Location à Troyes et toute l'Aube
          </div>

          {/*
            Note pour Maxime — l'attribut data-secret ci-dessous correspond à
            l'étape 4 de l'onboarding (le stagiaire utilise les DevTools du
            navigateur pour le découvrir). Ne pas retirer.
          */}
          <h1
            data-secret="BLEU3DA9FC"
            className="mb-6 font-heading text-6xl font-bold leading-tight text-primary-900 md:text-7xl"
          >
            Faites <span className="text-primary">rebondir</span>
            <br />
            vos plus beaux moments
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-700">
            Châteaux gonflables, parcours d'obstacles, toboggans géants…
            Trouvez le jeu parfait pour l'anniversaire de votre enfant ou votre
            événement.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/jeux"
              className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-600 px-8 py-4 font-heading text-lg font-bold text-white shadow-lg transition hover:scale-105 hover:shadow-xl"
            >
              Voir nos jeux
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
            </Link>
            <Link
              href="/devis"
              className="rounded-full border-2 border-primary bg-white px-8 py-4 font-heading text-lg font-bold text-primary transition hover:bg-primary-50"
            >
              Devis gratuit
            </Link>
          </div>
        </div>
      </section>

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

      {/* CTA temporaire pour onboarding */}
      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="rounded-3xl border-4 border-dashed border-accent/50 bg-accent/10 p-8 text-center">
          <h2 className="mb-2 font-heading text-2xl font-bold text-primary-800">
            👋 Stagiaire ? Commence par ton onboarding !
          </h2>
          <p className="mb-4 text-sm text-gray-700">
            5 énigmes à résoudre avant d'attaquer la chasse aux 40 bugs.
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
