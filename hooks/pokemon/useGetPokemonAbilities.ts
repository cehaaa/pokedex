import { useQuery } from "@tanstack/react-query";
import { POKEMON_ABILITIES } from "@/constants/queryKeys";
import { getPokemonAbilitiesByName } from "@/api/pokemon";

interface UseGetPokemonAbilitiesProps {
  name: string;
}

export function getPokemonAbilitiesQueryKey(name: string) {
  return [POKEMON_ABILITIES, name];
}

export function useGetPokemonAbilities({ name }: UseGetPokemonAbilitiesProps) {
  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: getPokemonAbilitiesQueryKey(name),
    queryFn: async () => {
      return await getPokemonAbilitiesByName(name);
    },
  });

  return { data, isLoading, error, ...rest };
}
