import { http } from "@/lib/http";
import type { PokemonAbility } from "@/types/Ability";
import { normalizePokemonAbilityResponse } from "@/utils/normalizePokemonResponse";

export async function getPokemonAbilitiesByName(name: string) {
  const { data: ability } = await http.get<PokemonAbility>(`/ability/${name}`);
  return normalizePokemonAbilityResponse(ability);
}
