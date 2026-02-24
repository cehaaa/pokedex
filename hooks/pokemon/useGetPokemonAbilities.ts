import { useQueryClient } from "@tanstack/react-query";
import { POKEMON_ABILITIES } from "@/constants/queryKeys";
import { PokemonAbility } from "@/types/Ability";
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
  const queryClient = useQueryClient();

  for (const ability of abilities) {
    queryClient.fetchQuery({
      queryKey: getPokemonAbilitiesQueryKey(ability),
      queryFn: () => getPokemonAbilitiesByName(ability),
    });
  }

  const data = abilities.map(
    (ability) =>
      queryClient.getQueryData(
        getPokemonAbilitiesQueryKey(ability)
      ) as PokemonAbility
  );

  return { data };
}
