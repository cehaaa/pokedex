import { useQuery } from "@tanstack/react-query";
import type { Species } from "@/types/Species";
import { POKEMON_SPECIES } from "@/constants/queryKeys";
import { getPokemonSpecies } from "@/api/species";

interface UseGetPokemonSpeciesProps {
  name: string;
}

export function getPokemonSpeciesQueryKey(name: string) {
  return [POKEMON_SPECIES, name];
}

export function useGetPokemonSpecies({ name }: UseGetPokemonSpeciesProps) {
  const { data: pokemonSpecies, ...rest } = useQuery({
    queryKey: getPokemonSpeciesQueryKey(name),
    queryFn: async () => await getPokemonSpecies(name),
  });

  return { data: pokemonSpecies || ({} as Species), ...rest };
}
