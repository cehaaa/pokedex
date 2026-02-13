import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { DEFAULT_OFFSET, DEFAULT_LIMIT } from "@/constants/queries";

import type { PokemonListWithDetails } from "@/types/Pokemon";

import { getPokemonList } from "@/api/pokemon";
import { createQueryClient, getPokemonListQueryKey } from "@/utils";

import InfinitePokemon from "@/components/home/InfinitePokemon";

export default async function Page() {
  const queryClient = createQueryClient();

  await queryClient.prefetchInfiniteQuery({
    initialPageParam: DEFAULT_OFFSET,
    queryKey: getPokemonListQueryKey({
      limit: DEFAULT_LIMIT,
      offset: DEFAULT_OFFSET,
    }),
    queryFn: async ({ pageParam }) => {
      const response = await getPokemonList({
        limit: DEFAULT_LIMIT,
        offset: pageParam,
      });
      return response;
    },
    getNextPageParam: (lastPage: PokemonListWithDetails) => {
      if (!lastPage || !lastPage.next) return undefined;
      const nextOffset = new URL(lastPage.next).searchParams.get("offset");
      return nextOffset ? Number(nextOffset) : undefined;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <InfinitePokemon />
    </HydrationBoundary>
  );
}
