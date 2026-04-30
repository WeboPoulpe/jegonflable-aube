import { Star, Quote as QuoteIcon } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Sophie L.",
    location: "Sainte-Savine",
    rating: 5,
    text: "Le toboggan a fait sensation pour les 8 ans de mon fils ! Installation impeccable, équipe très pro. On revient l'année prochaine.",
  },
  {
    name: "Karim B.",
    location: "Saint-André-les-Vergers",
    rating: 5,
    text: "Bubble foot pour mon EVG, on a passé un moment génial. Tarif honnête et SAV au top.",
  },
  {
    name: "Marie & Antoine",
    location: "Troyes",
    rating: 5,
    text: "Merci pour le château licorne ! Notre fille est aux anges. Livraison à l'heure, démontage rapide. À recommander.",
  },
];

export function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-2 text-center font-heading text-4xl font-bold text-primary-900">
          Ils nous font confiance
        </h2>
        <p className="mb-12 text-center text-gray-600">
          Plus de 200 familles chaque année dans l'Aube.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="relative rounded-2xl border-2 border-primary/10 bg-white p-6 shadow-sm"
            >
              <QuoteIcon className="absolute right-4 top-4 h-8 w-8 text-primary/10" />

              <div className="mb-3 flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                  />
                ))}
              </div>

              <p className="mb-4 italic text-gray-700">«&nbsp;{t.text}&nbsp;»</p>

              <div className="border-t border-primary/10 pt-3">
                <div className="font-heading font-bold text-primary-800">
                  {t.name}
                </div>
                <div className="text-xs text-gray-500">{t.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
