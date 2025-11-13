import { http, get } from "@/lib";
import { normalizePokemonResponse } from "@/utils";

import type { PaginatedResponse } from "@/types";
import type {
	Pokemon,
	PokemonSpecies,
	PokemonListResponse,
	PokemonWithSpecies,
} from "@/types/Pokemon";
import CONFIG from "@/config";

const SPECIAL_POKEMON_NAMES = {
	"giratina-altered": "giratina",
};

export interface GetPokemonListProps {
	limit?: number;
	offset?: number;
}
export async function getPokemonList({
	limit = CONFIG.PAGE_LIMIT,
	offset = 0,
}: GetPokemonListProps) {
	const { data } = await http.get<PaginatedResponse<PokemonListResponse>>(
		`/pokemon?limit=${limit}&offset=${offset}`
	);
	const pokemonNames = data.results.map(({ name }) => name);

	const pokemonListWithDetails = await Promise.all(
		pokemonNames.map(name => getPokemonDetailsByName<Pokemon>({ name }))
	);

	return pokemonListWithDetails;
}

interface GetPokemonDetailsByNameProps {
	name: string;
	withSpecies?: boolean;
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
