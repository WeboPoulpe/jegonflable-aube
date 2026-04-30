import Link from "next/link";
import Image from "next/image";
import { Users, Calendar, Ruler } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { GAME_TYPE_LABELS } from "@/lib/constants";

interface GameCardProps {
  slug: string;
  name: string;
  type: keyof typeof GAME_TYPE_LABELS;
  description: string;
  pricePerDay: number;
  capacity: number;
  ageMin: number;
  ageMax: number;
  width: number;
  length: number;
  photoUrl: string;
  badges?: string[];
}

export function GameCard(props: GameCardProps) {
  const badges = props.badges ?? [
    GAME_TYPE_LABELS[props.type],
    `${props.ageMin}-${props.ageMax} ans`,
    `${props.capacity} enfants`,
  ];

  return (
    <Link
      href={`/jeux/${props.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border-2 border-primary/10 bg-white shadow-sm transition hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-50">
        {/* BUG-17 : width et height sont inversés dans <Image>
            (la prop width reçoit la hauteur attendue et inversement).
            Conséquence : l'image affichée a un mauvais ratio
            (étirée verticalement ou horizontalement). */}
        <Image
          src={props.photoUrl}
          alt={props.name}
          width={300}
          height={500}
          className="h-full w-full object-cover transition group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-2 font-heading text-xl font-bold text-primary-900">
          {props.name}
        </h3>

        <div className="mb-3 flex flex-wrap gap-2">
          {/* BUG-11 : .map() sans key={} sur les badges.
              Conséquence : warning React visible dans la console.
              "Warning: Each child in a list should have a unique key prop." */}
          {badges.map((badge) => (
            <span className="rounded-full bg-primary-50 px-2 py-0.5 text-xs font-bold text-primary-700">
              {badge}
            </span>
          ))}
        </div>

        <p className="mb-4 line-clamp-2 flex-1 text-sm text-gray-600">
          {props.description}
        </p>

        <div className="mb-3 grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3 text-primary" />
            {props.capacity}
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3 text-primary" />
            {props.ageMin}-{props.ageMax}a
          </div>
          <div className="flex items-center gap-1">
            <Ruler className="h-3 w-3 text-primary" />
            {props.width}×{props.length}m
          </div>
        </div>

        <div className="flex items-end justify-between border-t border-primary/10 pt-3">
          <div>
            <div className="text-xs text-gray-500">À partir de</div>
            <div className="font-heading text-2xl font-bold text-primary">
              {formatPrice(props.pricePerDay)}
              <span className="text-sm font-normal text-gray-500"> /jour</span>
            </div>
          </div>
          <span className="rounded-full bg-accent px-4 py-2 font-heading text-sm font-bold text-primary-900 shadow-sm">
            Voir →
          </span>
        </div>
      </div>
    </Link>
  );
}
