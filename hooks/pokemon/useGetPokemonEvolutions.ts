import { useQuery } from "@tanstack/react-query";
import type { EvolutionChain } from "@/types/EvolutionChain";
import { POKEMON_EVOLUTIONS } from "@/constants/queryKeys";
import { getEvolutionChain } from "@/api/evolutionChain";

export function getPokemonEvolutionsQueryKey(id: number) {
  return [POKEMON_EVOLUTIONS, id];
}

export function useGetPokemonEvolutions(id: number) {
  const { data: evolutionChain, ...rest } = useQuery({
    queryKey: getPokemonEvolutionsQueryKey(id),
    queryFn: async () => await getEvolutionChain(id),
  });

  return { data: evolutionChain || ([] as EvolutionChain), ...rest };
}
