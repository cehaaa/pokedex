import { useQuery } from "@tanstack/react-query";
import { getPokemonMovesByName } from "@/api/pokemonMoves";

interface UseGetPokemonMoveProps {
	name: string;
}

export function useGetPokemonMove({ name }: UseGetPokemonMoveProps) {
	const { data, isLoading, error, ...rest } = useQuery({
		enabled: false,
		queryKey: ["pokemon-moves", name],
		queryFn: () => getPokemonMovesByName({ name }),
	});

	return { data, isLoading, error, ...rest };
}
