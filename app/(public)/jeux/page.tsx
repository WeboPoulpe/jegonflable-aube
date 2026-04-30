import { db } from "@/lib/db";
import { GameCard } from "@/components/public/GameCard";
import { GameFilters } from "@/components/public/GameFilters";
import { GAME_TYPES } from "@/lib/constants";

interface PageProps {
  searchParams: Promise<{
    type?: string;
    sort?: string;
  }>;
}

export const metadata = {
  title: "Catalogue des jeux gonflables",
};

export const dynamic = "force-dynamic";

export default async function JeuxPage({ searchParams }: PageProps) {
  const { type, sort = "name" } = await searchParams;

  const typeFilter =
    type && GAME_TYPES.includes(type as (typeof GAME_TYPES)[number])
      ? (type as (typeof GAME_TYPES)[number])
      : undefined;

  // BUG-12 : on oublie le filtre `where: { isPublished: true }`.
  // Conséquence : les jeux en brouillon (Mini Aire Bambin par exemple)
  // s'affichent côté public alors qu'ils ne devraient pas. Faille
  // de visibilité produit pour le client.
  let games = await db.game.findMany({
    where: typeFilter ? { type: typeFilter } : undefined,
  });

  // Tri côté serveur
  if (sort === "name") {
    games = games.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "price-asc") {
    // BUG-16 : `pricePerDay` est un Decimal Prisma (sérialisé en string).
    // Le tri arithmétique ne se fait donc pas correctement : "120" vs "90"
    // sont triés alphabétiquement (donc "120" < "90"). Conséquence :
    // l'ordre du catalogue par prix croissant est faux.
    games = games.sort((a, b) =>
      a.pricePerDay.toString().localeCompare(b.pricePerDay.toString()),
    );
  } else if (sort === "price-desc") {
    games = games.sort(
      (a, b) => Number(b.pricePerDay) - Number(a.pricePerDay),
    );
  } else if (sort === "capacity") {
    games = games.sort((a, b) => b.capacity - a.capacity);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 font-heading text-5xl font-bold text-primary-900">
        Nos jeux gonflables
      </h1>
      <p className="mb-8 text-gray-600">
        {games.length} jeu{games.length > 1 ? "x" : ""} disponible
        {games.length > 1 ? "s" : ""} à la location.
      </p>

      <GameFilters />

      {games.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-white p-12 text-center">
          <p className="text-gray-600">
            Aucun jeu trouvé avec ces critères.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {games.map((g) => (
            <GameCard
              key={g.id}
              slug={g.slug}
              name={g.name}
              type={g.type}
              description={g.description}
              pricePerDay={Number(g.pricePerDay)}
              capacity={g.capacity}
              ageMin={g.ageMin}
              ageMax={g.ageMax}
              width={g.width}
              length={g.length}
              photoUrl={g.photoUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
