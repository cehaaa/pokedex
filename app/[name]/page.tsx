import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getPokemonDetails } from "@/api/pokemon";
import { getPokemonSpecies } from "@/api/species";
import { getPokemonAbilitiesByName } from "@/api/ability";
import { getEvolutionChain } from "@/api/evolutionChain";
import { createQueryClient } from "@/utils/createQueryClient";
import { getPokemonDetailsQueryKey } from "@/hooks/pokemon/useGetPokemonDetails";
import { getPokemonSpeciesQueryKey } from "@/hooks/pokemon/useGetPokemonSpecies";
import { getPokemonAbilitiesQueryKey } from "@/hooks/pokemon/useGetPokemonAbilities";
import { getPokemonEvolutionsQueryKey } from "@/hooks/pokemon/useGetPokemonEvolutions";

import PokemonDetail from "@/components/PokemonDetailPage/PokemonDetail";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ ref: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { ref } = await searchParams;

  const queryClient = createQueryClient();

  const pokemonDetails = queryClient.fetchQuery({
    queryKey: getPokemonDetailsQueryKey(name),
    queryFn: async () => await getPokemonDetails(name),
  });

  const pokemonSpecies = queryClient.fetchQuery({
    queryKey: getPokemonSpeciesQueryKey(name),
    queryFn: async () => await getPokemonSpecies(name),
  });

  const [details, species] = await Promise.all([
    pokemonDetails,
    pokemonSpecies,
  ]);

  const abilitiesPromises = details.abilities.map((ability) =>
    queryClient.fetchQuery({
      queryKey: getPokemonAbilitiesQueryKey(ability),
      queryFn: () => getPokemonAbilitiesByName(ability),
    })
  );

  const evolutionChainPromise = queryClient.fetchQuery({
    queryKey: getPokemonEvolutionsQueryKey(species.evolutionChainId),
    queryFn: () => getEvolutionChain(species.evolutionChainId),
  });

  const [evolutionChain] = await Promise.all([
    evolutionChainPromise,
    ...abilitiesPromises,
  ]);

  await Promise.all(
    evolutionChain.map((speciesName) =>
      queryClient.fetchQuery({
        queryKey: getPokemonDetailsQueryKey(speciesName),
        queryFn: () => getPokemonDetails(speciesName),
      })
    )
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail name={name} backRef={ref} />
    </HydrationBoundary>
  );
}
