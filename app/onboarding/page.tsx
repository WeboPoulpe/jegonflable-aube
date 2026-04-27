import { Sparkles } from "lucide-react";
import { ONBOARDING_STEPS } from "@/lib/onboarding/steps";
import { TrophyCabinet } from "@/components/onboarding/TrophyCabinet";
import { OnboardingHomeClient } from "@/components/onboarding/OnboardingHomeClient";

export default function OnboardingHomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 py-16">
      <div className="mb-8 w-full rounded-3xl border-4 border-primary/20 bg-white/90 p-10 shadow-2xl backdrop-blur">
        <div className="mb-2 flex items-center justify-center gap-2 text-accent-500">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-bold uppercase tracking-widest">
            Stage WEBOMAX
          </span>
          <Sparkles className="h-5 w-5" />
        </div>

        <h1 className="mb-4 text-center font-heading text-5xl font-bold text-primary-800">
          Bienvenue dans la team !
        </h1>

        <p className="mb-8 text-center text-lg text-gray-700">
          Avant d'attaquer ta vraie mission (corriger les{" "}
          <strong className="text-primary">40 bugs cachés</strong> du site), tu
          dois prouver que tu sais explorer un projet. <br />
          <span className="font-semibold text-accent-500">
            5 énigmes, 5 codes secrets à trouver dans le code. 🕵️
          </span>
        </p>

        <OnboardingHomeClient steps={ONBOARDING_STEPS} />
      </div>

      <div className="w-full">
        <TrophyCabinet />
      </div>
    </main>
  );
}
