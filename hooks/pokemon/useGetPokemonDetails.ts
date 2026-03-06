import { useQuery } from "@tanstack/react-query";
import type { PokemonDetails } from "@/types/Pokemon";
import { POKEMON_DETAILS } from "@/constants/queryKeys";
import { getPokemonDetails } from "@/api/pokemon";

interface UseGetPokemonDetailsProps {
  name: string;
}

export function getPokemonDetailsQueryKey(name: string) {
  return [POKEMON_DETAILS, name];
}

export function useGetPokemonDetails({ name }: UseGetPokemonDetailsProps) {
  const { data: pokemonDetails, ...rest } = useQuery({
    queryKey: getPokemonDetailsQueryKey(name),
    queryFn: async () => await getPokemonDetails(name),
  });

  return { data: pokemonDetails || ({} as PokemonDetails), ...rest };
}
