import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getStep, ONBOARDING_STEPS } from "@/lib/onboarding/steps";
import { StepCard } from "@/components/onboarding/StepCard";

export function generateStaticParams() {
  return ONBOARDING_STEPS.map((s) => ({ n: String(s.n) }));
}

export default async function OnboardingStepPage({
  params,
}: {
  params: Promise<{ n: string }>;
}) {
  const { n } = await params;
  const stepNumber = Number.parseInt(n, 10);
  const step = getStep(stepNumber);

  if (!step) notFound();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-12">
      <Link
        href="/onboarding"
        className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-700 hover:text-primary-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour à la liste des étapes
      </Link>

      <StepCard step={step} totalSteps={ONBOARDING_STEPS.length} />
    </main>
  );
}
