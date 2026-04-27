import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding — Chasse au trésor",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-cream via-primary-50 to-accent-50">
      {/* Bulles flottantes décoratives */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-10 top-10 h-24 w-24 animate-float rounded-full bg-primary/20 blur-xl" />
        <div className="absolute right-20 top-40 h-32 w-32 animate-float rounded-full bg-accent/30 blur-2xl [animation-delay:1s]" />
        <div className="absolute bottom-20 left-1/3 h-40 w-40 animate-float rounded-full bg-primary-300/30 blur-2xl [animation-delay:2s]" />
        <div className="absolute right-10 bottom-10 h-28 w-28 animate-float rounded-full bg-accent/40 blur-xl [animation-delay:3s]" />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
