import { useInfiniteQuery } from "@tanstack/react-query";

import type { Pokemon } from "@/types/Pokemon";

import { getPokemonList, type GetPokemonListProps } from "@/api/pokemon";

import CONFIG from "@/config";

type UseGetInfinitePokemonProps = GetPokemonListProps;

export function useGetInfinitePokemon({
	limit = CONFIG.PAGE_LIMIT,
	offset = 20,
}: UseGetInfinitePokemonProps = {}) {
	const {
		data,
		isLoading,
		hasNextPage,
		isFetchingNextPage,
		fetchNextPage,
		...rest
	} = useInfiniteQuery<Pokemon[]>({
		queryKey: ["pokemon", limit, offset],
		initialPageParam: offset,
		queryFn: async ({ pageParam = offset }) => {
			return await getPokemonList({ limit, offset: Number(pageParam) });
		},
		getNextPageParam: (lastPage, allPages) => {
			if (lastPage.length < limit) return undefined;
			return allPages.length * limit + offset;
		},
	});

	return {
		data: data?.pages.flat() || [],
		isLoading,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		...rest,
	};
}
