"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Lock,
  Trophy as TrophyIcon,
  ArrowRight,
  RotateCcw,
  Clock,
  ExternalLink,
} from "lucide-react";
import {
  type OnboardingStep,
  DIFFICULTY_LABELS,
  DIFFICULTY_COLORS,
} from "@/lib/onboarding/steps";
import {
  getOnboardingState,
  resetOnboarding,
} from "@/lib/onboarding/storage";

interface Props {
  steps: OnboardingStep[];
}

export function OnboardingHomeClient({ steps }: Props) {
  const [unlockedSteps, setUnlockedSteps] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const refresh = () => {
      setUnlockedSteps(getOnboardingState().unlockedSteps);
    };
    refresh();
    setMounted(true);
    window.addEventListener("onboarding-update", refresh);
    return () => window.removeEventListener("onboarding-update", refresh);
  }, []);

  const maxUnlocked =
    unlockedSteps.length > 0 ? Math.max(...unlockedSteps) : 0;
  const nextStep = Math.min(maxUnlocked + 1, steps.length);
  const allDone = unlockedSteps.length === steps.length;

  const displayUnlocked = mounted ? unlockedSteps : [];
  const displayMax = mounted ? maxUnlocked : 0;

  // Sépare les étapes en 2 groupes pour la lisibilité
  const codeSteps = steps.filter((s) => s.n <= 5);
  const metierSteps = steps.filter((s) => s.n >= 6);

  return (
    <>
      {/* GROUPE 1 : Énigmes code rapides */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-primary/20" />
        <span className="font-heading text-sm font-bold uppercase tracking-widest text-primary-700">
          🕵️ 1. Énigmes code (1h)
        </span>
        <div className="h-1 flex-1 rounded-full bg-primary/20" />
      </div>

      <div className="mb-8 space-y-3">
        {codeSteps.map((step) => (
          <StepRow
            key={step.n}
            step={step}
            unlocked={displayUnlocked}
            maxUnlocked={displayMax}
          />
        ))}
      </div>

      {/* GROUPE 2 : Étapes métier longues */}
      <div className="mb-2 flex items-center gap-2">
        <div className="h-1 flex-1 rounded-full bg-accent/40" />
        <span className="font-heading text-sm font-bold uppercase tracking-widest text-orange-700">
          🛠️ 2. Setup métier (3-4 jours)
        </span>
        <div className="h-1 flex-1 rounded-full bg-accent/40" />
      </div>

      <div className="mb-8 space-y-3">
        {metierSteps.map((step) => (
          <StepRow
            key={step.n}
            step={step}
            unlocked={displayUnlocked}
            maxUnlocked={displayMax}
          />
        ))}
      </div>

      <Link
        href={
          allDone
            ? "/onboarding/complete"
            : `/onboarding/etape/${nextStep}`
        }
        className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-primary to-primary-600 px-8 py-4 font-heading text-xl font-bold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl"
      >
        {allDone
          ? "Voir mes trophées 🏆"
          : displayMax > 0
            ? `Reprendre à l'étape ${nextStep}`
            : "Commencer la chasse"}
        <ArrowRight className="h-6 w-6 transition group-hover:translate-x-1" />
      </Link>

      {mounted && displayMax > 0 && (
        <button
          onClick={() => {
            if (
              confirm(
                "Reset complet de l'onboarding ? (étapes, trophées et stats remis à zéro)",
              )
            ) {
              resetOnboarding();
            }
          }}
          className="mt-3 flex w-full items-center justify-center gap-1 text-xs text-gray-500 hover:text-gray-700"
        >
          <RotateCcw className="h-3 w-3" />
          Reset onboarding
        </button>
      )}

      <p className="mt-4 text-center text-xs text-gray-500">
        Astuce : tu peux fouiller partout dans le projet (README, fichiers,
        terminal, navigateur).
      </p>
    </>
  );
}

function StepRow({
  step,
  unlocked,
  maxUnlocked,
}: {
  step: OnboardingStep;
  unlocked: number[];
  maxUnlocked: number;
}) {
  const isDone = unlocked.includes(step.n);
  const isCurrent = step.n === maxUnlocked + 1 && !isDone;
  const isLocked = step.n > maxUnlocked + 1 && !isDone;

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border-2 p-4 transition ${
        isDone
          ? "border-success bg-success/10"
          : isCurrent
            ? "border-primary bg-primary-50 shadow-md"
            : "border-gray-200 bg-gray-50 opacity-60"
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-2xl ${
          isDone
            ? "bg-success text-white"
            : isCurrent
              ? "bg-primary text-white"
              : "bg-gray-300 text-white"
        }`}
      >
        {isLocked ? (
          <Lock className="h-5 w-5" />
        ) : isDone ? (
          <TrophyIcon className="h-5 w-5" />
        ) : (
          step.emoji
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <div className="font-heading text-lg font-bold text-gray-900">
            Étape {step.n} — {step.title}
          </div>
          <span
            className={`rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase ${DIFFICULTY_COLORS[step.difficulty]}`}
          >
            {DIFFICULTY_LABELS[step.difficulty]}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            {step.estimatedTime}
          </span>
        </div>
        <div className="text-sm text-gray-600">
          {isLocked
            ? "Verrouillé"
            : isDone
              ? "Terminé ✓"
              : "À toi de jouer"}
        </div>
      </div>

      {step.guideUrl && !isLocked && (
        <a
          href={step.guideUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-1 rounded-full border border-primary/30 bg-white px-3 py-1 text-xs font-bold text-primary-700 transition hover:bg-primary-50 sm:flex"
          onClick={(e) => e.stopPropagation()}
        >
          Guide
          <ExternalLink className="h-3 w-3" />
        </a>
      )}
    </div>
  );
}
