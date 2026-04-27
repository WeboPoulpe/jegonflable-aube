"use client";

import confetti from "canvas-confetti";

// Effet de confettis "trophée standard"
export function fireTrophyConfetti() {
  const duration = 2000;
  const end = Date.now() + duration;
  const colors = ["#3DA9FC", "#FFD23F", "#4ADE80", "#F87171", "#a855f7"];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors,
    });
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

// Effet plus violent pour trophée légendaire / fin onboarding
export function fireLegendaryConfetti() {
  const colors = ["#FFD23F", "#F87171", "#a855f7", "#FFC700"];

  // Salve initiale
  confetti({
    particleCount: 200,
    spread: 120,
    origin: { y: 0.6 },
    colors,
    scalar: 1.2,
  });

  // 3 vagues décalées
  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 0.7 },
      colors,
    });
  }, 250);

  setTimeout(() => {
    confetti({
      particleCount: 100,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 0.7 },
      colors,
    });
  }, 500);

  setTimeout(() => {
    confetti({
      particleCount: 250,
      spread: 160,
      origin: { y: 0.5 },
      colors,
      scalar: 1.5,
    });
  }, 1000);
}
