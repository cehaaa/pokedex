"use client";

import { useSearchParams } from "next/navigation";
import { useSearchPokemon } from "@/hooks/pokemon/useSearchPokemon";

import PokemonGrid from "@/components/layout/PokemonGrid";
import PokemonCard from "@/components/home/PokemonCard";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  const { data: pokemon } = useSearchPokemon({ name });

  if (!pokemon)
    return (
      <p className="text-center text-sm text-zinc-500">No pokemon found</p>
    );

  return (
    <>
      <div className="mb-5">
        <h2 className="font-semibold tracking-wider">
          Search Results for "{name}"
        </h2>
      </div>

      <PokemonGrid>
        <PokemonCard pokemon={pokemon} reference="search" />
      </PokemonGrid>
    </>
  );
}
