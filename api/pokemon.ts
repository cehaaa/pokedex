import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "@/constants/queries";

import type { PaginatedResponse } from "@/types";
import type {
  Pokemon,
  PokemonSpecies,
  PokemonListResponse,
  PokemonWithSpecies,
  PokemonListWithDetails,
} from "@/types/Pokemon";

import { http, get } from "@/lib";
import { normalizePokemonResponse } from "@/utils";

export interface GetPokemonListProps {
  limit?: number;
  offset?: number;
}
interface GetPokemonDetailsByNameProps {
  name: string;
  withSpecies?: boolean;
}

const SPECIAL_POKEMON_NAMES = { "giratina-altered": "giratina" };

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

  const pokemonListWithDetails = await Promise.all(
    pokemonNames.map((name) => getPokemonDetailsByName<Pokemon>({ name }))
  );

  return { ...rest, results: pokemonListWithDetails };
}

export async function getPokemonDetailsByName<
  T extends Pokemon | PokemonWithSpecies
>({ name, withSpecies = false }: GetPokemonDetailsByNameProps): Promise<T> {
  const { data: pokemon } = await http.get(`/pokemon/${name}`);

  const species = withSpecies ? await getPokemonSpeciesByName(name) : null;

  return normalizePokemonResponse<T>({ pokemon, species });
}

export async function getPokemonSpeciesByName(name: string) {
  const { data } = await http.get<PokemonSpecies>(
    `/pokemon-species/${get(SPECIAL_POKEMON_NAMES, name, name)}`
  );
  return data;
}
