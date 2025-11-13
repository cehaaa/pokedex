import { getPokemonList } from "@/api/pokemon";

import CONFIG from "@/config";

import PokemonGrid from "@/components/layout/PokemonGrid";
import PokemonCard from "@/components/home/PokemonCard";
import InfinitePokemon from "@/components/home/InfinitePokemon";

export default async function Page() {
	const pokemon = await getPokemonList({ limit: CONFIG.PAGE_LIMIT });

	return (
		<>
			<PokemonGrid className='mb-3'>
				{pokemon.map(pokemon => (
					<PokemonCard key={pokemon.name} pokemon={pokemon} />
				))}
			</PokemonGrid>
			<InfinitePokemon />
		</>
	);
}
