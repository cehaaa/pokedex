import { useGetPokemonSpecies } from "@/hooks/pokemon/useGetPokemonSpecies";
import { useGetPokemonEvolutions } from "@/hooks/pokemon/useGetPokemonEvolutions";
import Evolution from "./Evolution";
import PokemonGrid from "@/components/layout/PokemonGrid";
import { SkeletonGroup } from "@/components/ui/Skeleton";
import { SkeletonCard } from "@/components/home/PokemonSkeletonGroup";

interface PokemonEvolutionsProps {
  name: string;
}

export default function PokemonEvolutions({ name }: PokemonEvolutionsProps) {
  const { data: pokemonSpecies, isLoading: isLoadingSpecies } =
    useGetPokemonSpecies({ name });

  const { data: evolutionChain, isLoading: isLoadingEvolutions } =
    useGetPokemonEvolutions(pokemonSpecies.evolutionChainId);

  const isLoading = isLoadingSpecies || isLoadingEvolutions;

  if (isLoading)
    return (
      <PokemonGrid>
        <SkeletonGroup>
          <SkeletonCard />
        </SkeletonGroup>
      </PokemonGrid>
    );

  return (
    <PokemonGrid>
      {evolutionChain.map((species, counter) => (
        <Evolution key={species} name={species} counter={counter + 1} />
      ))}
    </PokemonGrid>
  );
}
