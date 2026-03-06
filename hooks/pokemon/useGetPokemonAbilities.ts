import { useQueries } from "@tanstack/react-query";
import { POKEMON_ABILITIES } from "@/constants/queryKeys";
import { Ability } from "@/types/Ability";
import { getPokemonAbilitiesByName } from "@/api/ability";

interface UseGetPokemonAbilitiesProps {
  abilities: string[];
}

export function getPokemonAbilitiesQueryKey(name: string) {
  return [POKEMON_ABILITIES, name];
}

export function useGetPokemonAbilities({
  abilities,
}: UseGetPokemonAbilitiesProps) {
  const queries = useQueries({
    queries: abilities.map((abilityName) => ({
      queryKey: getPokemonAbilitiesQueryKey(abilityName),
      queryFn: () => getPokemonAbilitiesByName(abilityName),
      enabled: !!abilityName,
    })),
  });

  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  const data = queries
    .map((query) => query.data)
    .filter((ability): ability is Ability => ability !== undefined);

  return {
    data,
    isLoading,
    isError,
  };
}
