// ===============================================
// Persistance locale de la progression onboarding
// ===============================================
// On utilise localStorage côté client pour la
// Phase 2 (pas encore d'auth). En Phase 5 ce sera
// remplacé par la session NextAuth + DB.

const STORAGE_KEY = "jegonflable_onboarding";

export interface OnboardingState {
  unlockedSteps: number[]; // étapes déjà résolues
  unlockedTrophies: string[]; // ids de trophées débloqués
  completedAt: string | null; // ISO date si fini
  hintsRevealed: number; // total d'indices dévoilés (pour trophée "Sans indice")
  errorsTotal: number; // total d'erreurs de saisie (pour trophée "Perfectionniste")
  startedAt: string | null; // pour trophée Speedrunner
}

const DEFAULT_STATE: OnboardingState = {
  unlockedSteps: [],
  unlockedTrophies: [],
  completedAt: null,
  hintsRevealed: 0,
  errorsTotal: 0,
  startedAt: null,
};

export function getOnboardingState(): OnboardingState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATE;
  }
}

export function saveOnboardingState(state: OnboardingState): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Notifier les autres composants montés (TrophyCabinet)
  window.dispatchEvent(new Event("onboarding-update"));
}

export function unlockStep(stepNumber: number): OnboardingState {
  const state = getOnboardingState();
  if (!state.unlockedSteps.includes(stepNumber)) {
    state.unlockedSteps.push(stepNumber);
  }
  saveOnboardingState(state);
  return state;
}

export function unlockTrophy(trophyId: string): OnboardingState {
  const state = getOnboardingState();
  if (!state.unlockedTrophies.includes(trophyId)) {
    state.unlockedTrophies.push(trophyId);
    saveOnboardingState(state);
  }
  return state;
}

export function incrementHintsRevealed(): void {
  const state = getOnboardingState();
  state.hintsRevealed += 1;
  saveOnboardingState(state);
}

export function incrementErrors(): void {
  const state = getOnboardingState();
  state.errorsTotal += 1;
  saveOnboardingState(state);
}

export function markStarted(): void {
  const state = getOnboardingState();
  if (!state.startedAt) {
    state.startedAt = new Date().toISOString();
    saveOnboardingState(state);
  }
}

export function markCompleted(): OnboardingState {
  const state = getOnboardingState();
  if (!state.completedAt) {
    state.completedAt = new Date().toISOString();
    saveOnboardingState(state);
  }
  return state;
}

export function resetOnboarding(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("onboarding-update"));
}
