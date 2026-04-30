import { MousePointerClick, ClipboardCheck, Truck, Sparkles } from "lucide-react";

const STEPS = [
  {
    icon: MousePointerClick,
    title: "1. Choisissez vos jeux",
    text: "Parcourez notre catalogue et sélectionnez les jeux qui vous plaisent.",
  },
  {
    icon: ClipboardCheck,
    title: "2. Demandez un devis",
    text: "Remplissez le formulaire en 2 minutes, on vous répond sous 24h.",
  },
  {
    icon: Truck,
    title: "3. On livre et installe",
    text: "Notre équipe pose tout chez vous le jour J. Vous n'avez rien à faire.",
  },
  {
    icon: Sparkles,
    title: "4. Profitez !",
    text: "Place à la fête. On revient récupérer le matériel à la fin.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 text-center font-heading text-4xl font-bold text-primary-900">
          Comment ça marche ?
        </h2>
        <p className="mb-12 text-center text-gray-600">
          4 étapes pour faire de votre événement un moment magique.
        </p>

        <div className="grid gap-6 md:grid-cols-4">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="relative rounded-2xl border-2 border-primary/10 bg-white p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-600 text-white shadow-lg">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-bold text-primary-800">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
