import Link from "next/link";
import { Trophy, ArrowRight, BookOpen } from "lucide-react";

export default function OnboardingCompletePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-16">
      <div className="w-full rounded-3xl border-4 border-success/30 bg-white/95 p-12 text-center shadow-2xl backdrop-blur">
        <div className="mb-4 flex justify-center">
          <div className="flex h-24 w-24 animate-bounce-slow items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-600 shadow-lg">
            <Trophy className="h-12 w-12 text-white" />
          </div>
        </div>

        <h1 className="mb-4 font-heading text-5xl font-bold text-primary-800">
          🎉 Bravo stagiaire !
        </h1>

        <p className="mb-2 text-lg text-gray-700">
          Tu as résolu les <strong className="text-primary">5 énigmes</strong>{" "}
          de l'onboarding.
        </p>

        <p className="mb-8 text-base text-gray-600">
          Tu sais maintenant lire la doc, le code, le terminal et utiliser les
          DevTools. <br />
          C'est la base du métier.
        </p>

        <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary-50 p-6 text-left">
          <h2 className="mb-3 flex items-center gap-2 font-heading text-xl font-bold text-primary-800">
            <BookOpen className="h-5 w-5" />
            Ta vraie mission commence
          </h2>
          <p className="mb-3 text-sm text-gray-700">
            Le site contient <strong>40 bugs cachés</strong> que tu dois
            trouver et corriger en 4 semaines :
          </p>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>
              🔴 <strong>14 bugs visibles</strong> qui plantent ou affichent une
              erreur
            </li>
            <li>
              🟡 <strong>13 bugs silencieux</strong> qui marchent mal sans
              prévenir
            </li>
            <li>
              🔧 <strong>13 trous fonctionnels</strong> à compléter (commentaires
              `TODO STAGIAIRE`)
            </li>
          </ul>
          <p className="mt-3 text-sm text-gray-700">
            Lis le fichier <code className="rounded bg-white px-2 py-1 text-xs">BUGS_HINTS.md</code>{" "}
            si tu bloques sur un bug : il contient 3 niveaux d'indices pour
            chaque.
          </p>
        </div>

        <Link
          href="/admin"
          className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-600 px-8 py-4 font-heading text-xl font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
        >
          Entrer dans le back-office
          <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
        </Link>

        <p className="mt-6 text-xs text-gray-500">
          Identifiants : <code className="rounded bg-gray-100 px-2 py-1">stagiaire@jegonflable-aube.fr</code>{" "}
          / <code className="rounded bg-gray-100 px-2 py-1">Stagiaire2026</code>
        </p>
      </div>
    </main>
  );
}
