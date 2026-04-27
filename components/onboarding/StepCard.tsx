"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import type { OnboardingStep } from "@/lib/onboarding/steps";
import { ProgressBar } from "@/components/onboarding/ProgressBar";
import { TrophyUnlockToast } from "@/components/onboarding/TrophyUnlockToast";
import { getTrophyForStep, type Trophy } from "@/lib/onboarding/trophies";
import {
  fireTrophyConfetti,
  fireLegendaryConfetti,
} from "@/lib/onboarding/confetti";
import {
  unlockStep,
  unlockTrophy,
  incrementHintsRevealed,
  incrementErrors,
  markStarted,
  getOnboardingState,
} from "@/lib/onboarding/storage";

interface Props {
  step: OnboardingStep;
  totalSteps: number;
}

export function StepCard({ step, totalSteps }: Props) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [showHint, setShowHint] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [trophyToShow, setTrophyToShow] = useState<Trophy | null>(null);

  useEffect(() => {
    markStarted();
  }, []);

  function revealHint(level: number) {
    if (level > showHint) {
      incrementHintsRevealed();
    }
    setShowHint(Math.max(showHint, level));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const cleaned = code.trim().toUpperCase();

    if (cleaned === step.expectedCode.toUpperCase()) {
      setStatus("ok");

      // 1. Marquer l'étape comme résolue
      unlockStep(step.n);

      // 2. Débloquer le trophée associé
      const trophy = getTrophyForStep(step.n);
      if (trophy) {
        unlockTrophy(trophy.id);
        setTrophyToShow(trophy);
      }

      // 3. Confettis (effet plus intense pour l'étape 5)
      if (step.n === totalSteps) {
        fireLegendaryConfetti();
      } else {
        fireTrophyConfetti();
      }

      // 4. Vérifier trophées extras à la dernière étape
      if (step.n === totalSteps) {
        checkBonusTrophies();
      }

      // 5. Redirection après animation
      setTimeout(() => {
        if (step.n < totalSteps) {
          router.push(`/onboarding/etape/${step.n + 1}`);
        } else {
          router.push("/onboarding/complete");
        }
      }, 3500);
    } else {
      incrementErrors();
      setStatus("error");
      setErrorMsg("Mauvais code. Continue de chercher !");
      setTimeout(() => setStatus("idle"), 1500);
    }
  }

  function checkBonusTrophies() {
    const state = getOnboardingState();

    // Speedrunner : moins de 30 min
    if (state.startedAt) {
      const elapsedMin =
        (Date.now() - new Date(state.startedAt).getTime()) / 1000 / 60;
      if (elapsedMin < 30) unlockTrophy("speed-runner");
    }

    // Sans indice : aucun indice dévoilé
    if (state.hintsRevealed === 0) unlockTrophy("no-hint");

    // Perfectionniste : aucune erreur
    if (state.errorsTotal === 0) unlockTrophy("perfectionist");
  }

  return (
    <>
      <TrophyUnlockToast
        trophy={trophyToShow}
        onClose={() => setTrophyToShow(null)}
      />

      <div className="rounded-3xl border-4 border-primary/20 bg-white/95 p-8 shadow-2xl backdrop-blur">
        <ProgressBar current={step.n} total={totalSteps} />

        <div className="mb-2 mt-6 text-center text-6xl">{step.emoji}</div>
        <div className="mb-1 text-center text-sm font-bold uppercase tracking-widest text-accent-500">
          Étape {step.n} / {totalSteps}
        </div>
        <h1 className="mb-6 text-center font-heading text-4xl font-bold text-primary-800">
          {step.title}
        </h1>

        <p className="mb-8 whitespace-pre-line text-base leading-relaxed text-gray-700">
          {step.description}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-bold text-gray-700">
              Code secret trouvé :
            </label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Tape ton code ici..."
              disabled={status === "loading" || status === "ok"}
              className={`w-full rounded-xl border-4 px-6 py-4 text-center font-mono text-2xl font-bold uppercase tracking-widest transition focus:outline-none ${
                status === "ok"
                  ? "border-success bg-success/10 text-success"
                  : status === "error"
                    ? "animate-pulse border-error bg-error/10 text-error"
                    : "border-primary/30 bg-cream focus:border-primary"
              }`}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!code || status === "loading" || status === "ok"}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-600 px-6 py-4 font-heading text-lg font-bold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "loading" && (
              <Loader2 className="h-5 w-5 animate-spin" />
            )}
            {status === "ok" && <CheckCircle2 className="h-5 w-5" />}
            {status === "error" && <XCircle className="h-5 w-5" />}
            {status === "ok"
              ? "Bravo ! 🎉"
              : status === "error"
                ? errorMsg
                : "Valider le code"}
          </button>
        </form>

        <div className="mt-8 border-t-2 border-dashed border-gray-200 pt-6">
          <div className="mb-3 text-sm font-bold text-gray-700">
            🆘 Tu bloques ? Dévoile un indice progressivement :
          </div>

          <div className="space-y-2">
            {step.hints.map((hint, idx) => {
              const visible = showHint > idx;
              const labels = [
                "Indice 1 (vague)",
                "Indice 2 (plus précis)",
                "Indice 3 (presque la réponse)",
              ];

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => revealHint(idx + 1)}
                  className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left text-sm transition ${
                    visible
                      ? "border-accent bg-accent/10"
                      : "border-gray-200 bg-gray-50 hover:border-accent/50"
                  }`}
                >
                  {visible ? (
                    <Eye className="h-4 w-4 shrink-0 text-accent-600" />
                  ) : (
                    <EyeOff className="h-4 w-4 shrink-0 text-gray-400" />
                  )}
                  <div>
                    <div className="font-bold text-gray-700">{labels[idx]}</div>
                    {visible && <div className="mt-1 text-gray-600">{hint}</div>}
                  </div>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[11px] italic text-gray-500">
            ⚠️ Dévoiler un indice te coûte le trophée légendaire « Sans indice »
          </p>
        </div>

        <div className="mt-6 rounded-xl bg-primary-50 p-4 text-xs text-primary-800">
          💡 <strong>Compétence travaillée :</strong> {step.skillTaught}
        </div>
      </div>
    </>
  );
}
