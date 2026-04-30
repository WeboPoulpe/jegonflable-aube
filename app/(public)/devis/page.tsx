import { db } from "@/lib/db";
import { QuoteForm } from "@/components/public/QuoteForm";

interface PageProps {
  searchParams: Promise<{ game?: string }>;
}

export const metadata = {
  title: "Demander un devis",
};

export const dynamic = "force-dynamic";

export default async function DevisPage({ searchParams }: PageProps) {
  const { game: preselectedGameId } = await searchParams;

  const games = await db.game.findMany({
    where: { isPublished: true },
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      pricePerDay: true,
    },
  });

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 font-heading text-5xl font-bold text-primary-900">
        Devis gratuit
      </h1>
      <p className="mb-8 text-gray-600">
        Remplis ce formulaire en 2 minutes, on te recontacte sous 24h.
      </p>

      <QuoteForm
        games={games.map((g) => ({
          id: g.id,
          name: g.name,
          pricePerDay: Number(g.pricePerDay),
        }))}
        preselectedGameId={preselectedGameId}
      />
    </div>
  );
}
