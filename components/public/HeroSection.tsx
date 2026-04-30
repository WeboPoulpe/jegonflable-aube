"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

const HEADLINES = [
  "Faites rebondir vos plus beaux moments",
  "Donnez le sourire à toute la tribu",
  "Le château gonflable, partout, tout le temps",
];

export function HeroSection() {
  // BUG-10 : l'état initial est 5, mais le tableau HEADLINES n'a que 3 éléments.
  // Conséquence : au premier render, HEADLINES[5] est undefined → le <h1>
  // affiche "undefined" puis rien (ou un espace vide), ce qui casse complètement
  // l'effet wahou de la page d'accueil. Le stagiaire doit corriger
  // useState(5) → useState(0).
  const [index, setIndex] = useState(5);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-cream via-primary-50 to-accent/20 py-20">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-bold text-primary-700 shadow-sm backdrop-blur">
          <Sparkles className="h-4 w-4 text-accent-500" />
          Location à Troyes et toute l'Aube
        </div>

        {/*
          Note pour Maxime — l'attribut data-secret correspond à
          l'étape 4 de l'onboarding (le stagiaire utilise les DevTools du
          navigateur pour le découvrir). Ne pas retirer.
        */}
        <h1
          data-secret="BLEU3DA9FC"
          className="mb-6 font-heading text-6xl font-bold leading-tight text-primary-900 md:text-7xl"
        >
          {HEADLINES[index]}
        </h1>

        <div className="mb-8 flex justify-center gap-2">
          {HEADLINES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${
                i === index
                  ? "w-8 bg-primary"
                  : "w-2 bg-primary/30 hover:bg-primary/50"
              }`}
              aria-label={`Slogan ${i + 1}`}
            />
          ))}
        </div>

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
  );
}
