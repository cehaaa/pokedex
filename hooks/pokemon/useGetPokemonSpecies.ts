import { useQuery } from "@tanstack/react-query";
import { POKEMON_SPECIES } from "@/constants/queryKeys";
import { getPokemonSpeciesByName } from "@/api/pokemon";

interface UseGetPokemonSpeciesProps {
  name: string;
}

export function getPokemonSpeciesQueryKey(name: string) {
  return [POKEMON_SPECIES, name];
}

export function useGetPokemonSpecies({ name }: UseGetPokemonSpeciesProps) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: getPokemonSpeciesQueryKey(name),
    queryFn: async () => {
      return await getPokemonSpeciesByName(name);
    },
  });

  return { data, isLoading, error, ...rest };
}
