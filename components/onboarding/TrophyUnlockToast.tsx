"use client";

import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import {
  RARITY_COLORS,
  RARITY_BORDER,
  RARITY_LABELS,
  type Trophy,
} from "@/lib/onboarding/trophies";

interface Props {
  trophy: Trophy | null;
  onClose: () => void;
}

export function TrophyUnlockToast({ trophy, onClose }: Props) {
  return (
    <AnimatePresence>
      {trophy && (
        <motion.div
          initial={{ y: -100, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -100, opacity: 0, scale: 0.5 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed left-1/2 top-8 z-50 -translate-x-1/2"
          onClick={onClose}
        >
          <div
            className={`flex items-center gap-4 rounded-2xl border-4 ${RARITY_BORDER[trophy.rarity]} bg-gradient-to-br ${RARITY_COLORS[trophy.rarity]} px-6 py-4 shadow-2xl`}
          >
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.6 }}
              className="text-5xl drop-shadow-lg"
            >
              {trophy.emoji}
            </motion.div>
            <div className="text-white">
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest opacity-90">
                <Sparkles className="h-3 w-3" />
                Trophée {RARITY_LABELS[trophy.rarity]} débloqué !
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="font-heading text-2xl font-bold drop-shadow-md">
                {trophy.title}
              </div>
              <div className="text-sm opacity-90">{trophy.description}</div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
