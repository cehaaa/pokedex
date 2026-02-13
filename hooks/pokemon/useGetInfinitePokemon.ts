import { useInfiniteQuery } from "@tanstack/react-query";

import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "@/constants/queries";

import type { PokemonListWithDetails } from "@/types/Pokemon";

import { getPokemonList, type GetPokemonListProps } from "@/api/pokemon";
import { getPokemonListQueryKey } from "@/utils";

type UseGetInfinitePokemonProps = GetPokemonListProps;

export function useGetInfinitePokemon({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
}: UseGetInfinitePokemonProps = {}) {
  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    ...rest
  } = useInfiniteQuery({
    initialPageParam: offset,
    queryKey: getPokemonListQueryKey({ limit, offset }),
    queryFn: async ({ pageParam }) => {
      const response = await getPokemonList({ limit, offset: pageParam });
      return response;
    },
    getNextPageParam: (lastPage: PokemonListWithDetails) => {
      if (!lastPage || !lastPage.next) return undefined;
      const nextOffset = new URL(lastPage.next).searchParams.get("offset");
      return nextOffset ? Number(nextOffset) : undefined;
    },
  });

  return {
    data: data?.pages.flatMap((page) => page.results) || [],
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    ...rest,
  };
}
