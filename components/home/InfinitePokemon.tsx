"use client";

import { useRef, useCallback } from "react";

import { useGetInfinitePokemon } from "@/hooks/pokemon";

import PokemonGrid from "@/components/layout/PokemonGrid";
import PokemonCard from "@/components/home/PokemonCard";
import SkeletonGroup from "@/components/home/SkeletonGroup";
import InfiniteScroll from "@/components/common/InfiniteScroll";

export default function InfinitePokemon() {
  const infiniteScrollRef = useRef<HTMLDivElement>(null);

  const {
    data: pokemon,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfinitePokemon();

  const handleOnIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <InfiniteScroll
      ref={infiniteScrollRef}
      isLoading={isLoading || isFetchingNextPage}
      onIntersect={handleOnIntersect}
      renderLoader={() => <SkeletonGroup length={10} />}
    >
      <PokemonGrid>
        {pokemon.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </PokemonGrid>
    </InfiniteScroll>
  );
}
