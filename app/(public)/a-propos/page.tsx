import { Heart, Award, MapPin } from "lucide-react";

export const metadata = {
  title: "À propos",
};

export default function AProposPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 font-heading text-5xl font-bold text-primary-900">
        L'histoire de Jegonflable Aube
      </h1>
      <p className="mb-12 text-lg text-gray-600">
        Une entreprise familiale au service des familles auboises.
      </p>

      <div className="prose prose-lg mb-12 max-w-none">
        <p>
          <strong>Jegonflable Aube</strong>, c'est avant tout une histoire de
          famille. Créée en 2018 à Troyes, l'entreprise est née d'un constat
          simple : il manquait dans l'Aube une vraie offre de location de jeux
          gonflables, **pro, accessible et de qualité**.
        </p>

        <p>
          Aujourd'hui, on livre, installe et démonte plus de **200 événements
          par an** : anniversaires d'enfants, fêtes des écoles, mariages,
          séminaires d'entreprise. Notre flotte compte 15 jeux, tous
          contrôlés et certifiés CE, renouvelés régulièrement.
        </p>

        <p>
          Notre engagement : être **présent du devis à la fin de l'événement**.
          Pas de surprise, pas de frais cachés, pas de matériel défectueux.
          Juste de la bonne humeur et des sourires d'enfants.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 text-center shadow-sm">
          <Heart className="mx-auto mb-3 h-10 w-10 text-error" />
          <div className="mb-1 font-heading text-3xl font-bold text-primary-800">
            200+
          </div>
          <div className="text-sm text-gray-600">événements / an</div>
        </div>
        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 text-center shadow-sm">
          <Award className="mx-auto mb-3 h-10 w-10 text-accent-500" />
          <div className="mb-1 font-heading text-3xl font-bold text-primary-800">
            4.9 / 5
          </div>
          <div className="text-sm text-gray-600">satisfaction client</div>
        </div>
        <div className="rounded-2xl border-2 border-primary/10 bg-white p-6 text-center shadow-sm">
          <MapPin className="mx-auto mb-3 h-10 w-10 text-primary" />
          <div className="mb-1 font-heading text-3xl font-bold text-primary-800">
            30 km
          </div>
          <div className="text-sm text-gray-600">de Troyes inclus</div>
        </div>
      </div>
    </div>
  );
}
