import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getPokemonDetails } from "@/api/pokemon";
import { getPokemonSpecies } from "@/api/species";
import { createQueryClient } from "@/utils/createQueryClient";
import { getPokemonDetailsQueryKey } from "@/hooks/pokemon/useGetPokemonDetails";
import { getPokemonSpeciesQueryKey } from "@/hooks/pokemon/useGetPokemonSpecies";

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
    queryFn: async () => await getPokemonDetails(name),
  });

  const pokemonSpecies = queryClient.prefetchQuery({
    queryKey: getPokemonSpeciesQueryKey(name),
    queryFn: async () => await getPokemonSpecies(name),
  });

  await Promise.all([pokemonDetails, pokemonSpecies]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail name={name} backRef={ref} />
    </HydrationBoundary>
  );
}
