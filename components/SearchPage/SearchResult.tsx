"use client";

import { useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import type { Pokemon } from "@/types/Pokemon";

import { useDebounce } from "@/hooks/useDebounce";
import { getPokemonQueryKey } from "@/hooks/pokemon/useSearchPokemon";

import PokemonGrid from "@/components/layout/PokemonGrid";
import PokemonCard from "@/components/home/PokemonCard";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";

  const queryClient = useQueryClient();
  const debouncedName = useDebounce({ value: name, delay: 800 });
  const pokemon = queryClient.getQueryData<Pokemon>(
    getPokemonQueryKey(debouncedName)
  );

  if (!pokemon || !name) return null;

  return (
    <PokemonGrid>
      <PokemonCard pokemon={pokemon} reference="search" />
    </PokemonGrid>
  );
}
