"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { GAME_TYPES, GAME_TYPE_LABELS } from "@/lib/constants";

export function GameFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentType = searchParams.get("type") ?? "ALL";
  const currentSort = searchParams.get("sort") ?? "name";

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`/jeux${params.toString() ? `?${params.toString()}` : ""}`);
  }

  const hasActiveFilters = currentType !== "ALL" || currentSort !== "name";

  return (
    <div className="mb-8 rounded-2xl border-2 border-primary/10 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center gap-2 font-heading font-bold text-primary-800">
        <Filter className="h-4 w-4" />
        Filtres
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => router.push("/jeux")}
            className="ml-auto flex items-center gap-1 rounded-full bg-error/10 px-3 py-0.5 text-xs font-bold text-error hover:bg-error/20"
          >
            <X className="h-3 w-3" />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-bold text-gray-700">
            Type de jeu
          </label>
          <select
            value={currentType}
            onChange={(e) => updateParam("type", e.target.value)}
            className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="ALL">Tous les types</option>
            {GAME_TYPES.map((t) => (
              <option key={t} value={t}>
                {GAME_TYPE_LABELS[t]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 min-w-[200px]">
          <label className="mb-1 block text-xs font-bold text-gray-700">
            Trier par
          </label>
          <select
            value={currentSort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="w-full rounded-xl border-2 border-gray-300 px-3 py-2 text-sm focus:border-primary focus:outline-none"
          >
            <option value="name">Nom (A-Z)</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="capacity">Capacité</option>
          </select>
        </div>

        {/*
          BUG-19 (TROU STAGIAIRE) : implémenter le filtre par capacité.
          Un slider min/max ou 2 inputs number "Capacité min" + "Capacité max"
          qui mettent à jour les query params ?capMin=X&capMax=Y.
          Le filtrage côté server lira ces params dans app/(public)/jeux/page.tsx.
          Voir BUGS_HINTS.md → BUG-19
        */}
      </div>
    </div>
  );
}
