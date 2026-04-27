"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy as TrophyIcon, Lock } from "lucide-react";
import {
  TROPHIES,
  RARITY_COLORS,
  RARITY_BORDER,
  RARITY_LABELS,
  type Trophy,
} from "@/lib/onboarding/trophies";
import { getOnboardingState } from "@/lib/onboarding/storage";

export function TrophyCabinet() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>([]);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      setUnlockedIds(getOnboardingState().unlockedTrophies);
    };
    refresh();
    window.addEventListener("onboarding-update", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("onboarding-update", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const totalUnlocked = unlockedIds.length;

  return (
    <div className="rounded-3xl border-4 border-accent/30 bg-white/90 p-6 shadow-xl backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-heading text-2xl font-bold text-primary-800">
          <TrophyIcon className="h-6 w-6 text-accent-500" />
          Ta vitrine de trophées
        </h2>
        <div className="rounded-full bg-accent/20 px-4 py-1 font-bold text-primary-800">
          {totalUnlocked} / {TROPHIES.length}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {TROPHIES.map((trophy) => {
          const isUnlocked = unlockedIds.includes(trophy.id);
          return (
            <TrophyCell
              key={trophy.id}
              trophy={trophy}
              unlocked={isUnlocked}
              hovered={hovered === trophy.id}
              onHover={(h) => setHovered(h ? trophy.id : null)}
            />
          );
        })}
      </div>

      <p className="mt-4 text-center text-xs text-gray-500">
        🏆 Les trophées dorés et violets sont rares. Les blancs/bleus sont plus
        faciles. Trouve-les tous !
      </p>
    </div>
  );
}

function TrophyCell({
  trophy,
  unlocked,
  hovered,
  onHover,
}: {
  trophy: Trophy;
  unlocked: boolean;
  hovered: boolean;
  onHover: (h: boolean) => void;
}) {
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
    >
      <motion.div
        initial={false}
        animate={
          unlocked
            ? { scale: 1, opacity: 1, rotate: 0 }
            : { scale: 0.9, opacity: 0.4, rotate: 0 }
        }
        whileHover={unlocked ? { scale: 1.1, rotate: -5 } : {}}
        transition={{ type: "spring", stiffness: 300 }}
        className={`relative flex aspect-square w-full items-center justify-center rounded-2xl border-4 ${
          unlocked
            ? `${RARITY_BORDER[trophy.rarity]} bg-gradient-to-br ${RARITY_COLORS[trophy.rarity]} shadow-lg`
            : "border-gray-300 bg-gray-100"
        }`}
      >
        {unlocked ? (
          <span className="text-3xl drop-shadow-md">{trophy.emoji}</span>
        ) : (
          <Lock className="h-6 w-6 text-gray-400" />
        )}

        {unlocked && trophy.rarity === "legendary" && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                "0 0 10px rgba(255,210,63,0.5)",
                "0 0 25px rgba(255,210,63,0.9)",
                "0 0 10px rgba(255,210,63,0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.div>

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="pointer-events-none absolute -top-2 left-1/2 z-20 w-48 -translate-x-1/2 -translate-y-full rounded-xl border-2 border-primary/30 bg-white p-3 text-left shadow-xl"
          >
            <div className="mb-1 flex items-center gap-2">
              <span className="text-lg">{trophy.emoji}</span>
              <span className="font-heading text-sm font-bold text-primary-900">
                {unlocked ? trophy.title : "???"}
              </span>
            </div>
            <div className="mb-2 inline-block rounded-full bg-accent/30 px-2 py-0.5 text-[10px] font-bold uppercase text-primary-800">
              {RARITY_LABELS[trophy.rarity]}
            </div>
            <p className="text-xs text-gray-700">
              {unlocked
                ? trophy.description
                : trophy.unlockedBy === "extra"
                  ? "🤫 Trophée caché. À toi de le découvrir."
                  : `Termine l'étape ${trophy.stepNumber} pour le débloquer.`}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
