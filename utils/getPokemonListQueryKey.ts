import { POKEMON } from "@/constants/queryKeys";

type GetPokemonListQueryKeyProps = { limit?: number; offset?: number };

export function getPokemonListQueryKey({
  limit,
  offset,
}: GetPokemonListQueryKeyProps) {
  return [POKEMON, limit, offset];
}
