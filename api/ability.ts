import { http } from "@/lib/http";
import type { Ability } from "@/types/Ability";
import { normalizePokemonAbilityResponse } from "@/utils/normalizePokemonResponse";

export async function getPokemonAbilitiesByName(name: string) {
  const { data: ability } = await http.get<Ability>(`/ability/${name}`);
  return normalizePokemonAbilityResponse(ability);
}
