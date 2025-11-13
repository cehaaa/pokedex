import type { Pokemon } from "@/types/Pokemon";

import PokemonGrid from "@/components/layout/PokemonGrid";
import PokemonCard from "@/components/home/PokemonCard";

interface SearchResultProps {
	pokemon: Pokemon | undefined;
}

export default function SearchResult({ pokemon }: SearchResultProps) {
	if (!pokemon) return null;

	return (
		<PokemonGrid>
			<PokemonCard pokemon={pokemon} reference='search' />
		</PokemonGrid>
	);
}
