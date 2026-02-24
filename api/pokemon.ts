import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "@/constants/queries";

import type { PaginatedResponse } from "@/types";
import type {
  Pokemon,
  PokemonListResponse,
  PokemonListWithDetails,
} from "@/types/Pokemon";

import { http } from "@/lib/http";
import { normalizePokemonResponse } from "@/utils/normalizePokemonResponse";

export interface GetPokemonListProps {
  limit?: number;
  offset?: number;
}

function buildQueryParams({ limit, offset }: GetPokemonListProps) {
  const params = new URLSearchParams();
  if (limit) params.set("limit", limit.toString());
  if (offset) params.set("offset", offset.toString());
  return params.toString();
}

export async function getPokemonList({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
}: GetPokemonListProps = {}): Promise<PokemonListWithDetails> {
  const queryParams = buildQueryParams({ limit, offset });
  const {
    data: { results, ...rest },
  } = await http.get<PaginatedResponse<PokemonListResponse>>(
    `/pokemon?${queryParams}`
  );

  const pokemonNames = results.map(({ name }) => name);

  const pokemonListWithDetails = await getPokemonListWithDetails(pokemonNames);

  return { ...rest, results: pokemonListWithDetails };
}

async function getPokemonListWithDetails(pokemonNames: string[]) {
  const response = await Promise.all(
    pokemonNames.map((name) => getPokemonDetails(name))
  );
  return response;
}

export async function getPokemonDetails(name: string) {
  const { data: pokemon } = await http.get<Pokemon>(`/pokemon/${name}`);
  return normalizePokemonResponse(pokemon);
}
