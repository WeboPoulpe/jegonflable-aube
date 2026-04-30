import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Users,
  Calendar,
  Ruler,
  Weight,
  ArrowRight,
  ArrowLeft,
  // BUG-13 : à la place de l'icône Sparkles (étincelles décoratives à
  // côté du nom du jeu), on importe Bug (icône d'un insecte 🐛).
  // Conséquence : visuellement bizarre — un bug s'affiche à côté du
  // nom du jeu sur la fiche détail. Le stagiaire doit comprendre
  // qu'il faut remplacer Bug par Sparkles dans cet import + dans le JSX.
  Bug,
} from "lucide-react";
import { db } from "@/lib/db";
import { formatPrice } from "@/lib/utils";
import { GAME_TYPE_LABELS } from "@/lib/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export default async function JeuDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const game = await db.game.findUnique({
    where: { slug },
  });

  if (!game || !game.isPublished) notFound();

  const stats = [
    {
      icon: Users,
      label: "Capacité",
      value: `${game.capacity} enfants`,
    },
    {
      icon: Calendar,
      label: "Âge",
      value: `${game.ageMin} - ${game.ageMax} ans`,
    },
    {
      icon: Ruler,
      label: "Dimensions",
      value: `${game.width} × ${game.length} × ${game.height} m`,
    },
    {
      icon: Weight,
      label: "Poids",
      value: game.weight ? `${game.weight} kg` : "—",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link
        href="/jeux"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        Retour au catalogue
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border-4 border-primary/20 shadow-xl">
          <Image
            src={game.photoUrl}
            alt={game.name}
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover"
            unoptimized
          />
        </div>

        <div className="flex flex-col">
          <span className="mb-2 inline-block w-fit rounded-full bg-primary-100 px-3 py-1 text-xs font-bold uppercase text-primary-700">
            {GAME_TYPE_LABELS[game.type]}
          </span>

          <h1 className="mb-4 flex items-center gap-3 font-heading text-5xl font-bold text-primary-900">
            <Bug className="h-10 w-10 text-accent-500" />
            {game.name}
          </h1>

          <p className="mb-6 text-gray-700">{game.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border-2 border-primary/10 bg-white p-3 shadow-sm"
              >
                <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase text-gray-500">
                  <s.icon className="h-3 w-3" />
                  {s.label}
                </div>
                <div className="font-heading text-base font-bold text-primary-800">
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto rounded-2xl border-4 border-accent/40 bg-accent/10 p-6">
            <div className="mb-3 text-sm text-gray-700">À partir de</div>
            <div className="mb-4 font-heading text-5xl font-bold text-primary-900">
              {formatPrice(Number(game.pricePerDay))}
              <span className="text-base font-normal text-gray-600"> /jour</span>
            </div>
            <Link
              href={`/devis?game=${game.id}`}
              className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary-600 px-6 py-3 font-heading text-base font-bold text-white shadow-lg transition hover:shadow-xl"
            >
              Demander un devis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
