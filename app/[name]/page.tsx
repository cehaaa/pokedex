import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import {
  getPokemonDetailsByName,
  getPokemonSpeciesByName,
  getPokemonAbilitiesByName,
} from "@/api/pokemon";
import { createQueryClient } from "@/utils/createQueryClient";
import { getPokemonDetailsQueryKey } from "@/hooks/pokemon/useGetPokemonDetails";
import { getPokemonSpeciesQueryKey } from "@/hooks/pokemon/useGetPokemonSpecies";
import { getPokemonAbilitiesQueryKey } from "@/hooks/pokemon/useGetPokemonAbilities";

import PokemonDetail from "@/components/PokemonDetailPage/PokemonDetail";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ ref: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { ref } = await searchParams;

  const queryClient = createQueryClient();

  const pokemonDetails = queryClient.prefetchQuery({
    queryKey: getPokemonDetailsQueryKey(name),
    queryFn: async () => {
      return await getPokemonDetailsByName(name);
    },
  });

  const pokemonSpecies = queryClient.prefetchQuery({
    queryKey: getPokemonSpeciesQueryKey(name),
    queryFn: async () => {
      return await getPokemonSpeciesByName(name);
    },
  });

  await Promise.allSettled([pokemonDetails, pokemonSpecies]);

  // await queryClient.prefetchQuery({
  //   queryKey: getPokemonAbilitiesQueryKey(name),
  //   queryFn: async () => {
  //     return await getPokemonAbilitiesByName(name);
  //   },
  // });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail name={name} backRef={ref} />
    </HydrationBoundary>
  );
}
