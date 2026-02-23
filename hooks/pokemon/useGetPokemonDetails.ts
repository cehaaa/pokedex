import { useQuery } from "@tanstack/react-query";
import type { PokemonDetails } from "@/types/Pokemon";
import { POKEMON_DETAILS } from "@/constants/queryKeys";
import { getPokemonDetailsByName } from "@/api/pokemon";

interface UseGetPokemonDetailsProps {
  name: string;
}

export function getPokemonDetailsQueryKey(name: string) {
  return [POKEMON_DETAILS, name];
}

export function useGetPokemonDetails({ name }: UseGetPokemonDetailsProps) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: getPokemonDetailsQueryKey(name),
    queryFn: async () => {
      const response = await getPokemonDetailsByName(name);
      return response;
    },
  });

  return { data, isLoading, error, ...rest };
}
