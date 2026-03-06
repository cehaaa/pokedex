"use client";

import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import { useGetPokemonAbilities } from "@/hooks/pokemon/useGetPokemonAbilities";
import { SkeletonGroup, Skeleton } from "@/components/ui/Skeleton";
import AbilityEffect from "./AbilityEffect";

interface PokemonAbilitiesProps {
  name: string;
}

export default function PokemonAbilities({ name }: PokemonAbilitiesProps) {
  const { data: pokemonDetails, isLoading: isLoadingDetails } =
    useGetPokemonDetails({ name });
  const { data: abilities, isLoading: isLoadingAbilities } =
    useGetPokemonAbilities({
      abilities: pokemonDetails.abilities || [],
    });

  const isLoading = isLoadingDetails || isLoadingAbilities;

  if (isLoading) {
    return (
      <div className="grid gap-5">
        <SkeletonGroup>
          <Skeleton className="w-full bg-gray-100 p-3">
            <Skeleton className="w-1/4 h-4 mb-1.5" />
            <Skeleton className="w-full h-15" />
          </Skeleton>
        </SkeletonGroup>
      </div>
    );
  }

  if (!abilities || abilities.length === 0) return null;

  return (
    <div className="grid gap-3">
      {abilities.map((ability) => (
        <AbilityEffect key={ability.slug} ability={ability} />
      ))}
    </div>
  );
}
