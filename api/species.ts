import { http } from "@/lib/http";
import type { PokemonSpecies } from "@/types/Pokemon";
import { normalizePokemonSpeciesResponse } from "@/utils/normalizePokemonResponse";
import { get } from "@/lib/get";

const SPECIAL_POKEMON_NAMES = { "giratina-altered": "giratina" };

export async function getPokemonSpecies(name: string) {
  const { data: species } = await http.get<PokemonSpecies>(
    `/pokemon-species/${get(SPECIAL_POKEMON_NAMES, name, name)}`
  );
  return normalizePokemonSpeciesResponse(species);
}
