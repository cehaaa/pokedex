import { POKEMON } from "@/constants/queryKeys";

export function getPokemonQueryKey(name: string) {
  return [POKEMON, name];
}
