import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { getPokemonDetailsByName } from "@/api/pokemon";
import { createQueryClient } from "@/utils/createQueryClient";
import { getPokemonQueryKey } from "@/utils/getPokemonQueryKey";

import PokemonDetail from "@/components/PokemonDetailPage/PokemonDetail";

interface PageProps {
  params: Promise<{ name: string }>;
  searchParams: Promise<{ ref: string }>;
}

export default async function Page({ params, searchParams }: PageProps) {
  const { name } = await params;
  const { ref } = await searchParams;

  const queryClient = createQueryClient();
  await queryClient.prefetchQuery({
    queryKey: getPokemonQueryKey(name),
    queryFn: async () => {
      return await getPokemonDetailsByName({ name, withSpecies: true });
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PokemonDetail name={name} backRef={ref} />
    </HydrationBoundary>
  );
}
