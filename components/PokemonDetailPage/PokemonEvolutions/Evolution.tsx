import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import PokemonCard from "@/components/home/PokemonCard";
import { SkeletonCard } from "@/components/home/PokemonSkeletonGroup";

interface EvolutionProps {
  name: string;
  counter: number;
}

export default function Evolution({ name, counter }: EvolutionProps) {
  const { data: pokemonDetails, isLoading } = useGetPokemonDetails({ name });

  if (isLoading) return <SkeletonCard />;

  if (!pokemonDetails) return null;

  return (
    <div className="relative">
      <div className="absolute -left-2 -top-2 size-6 text-sm rounded-full bg-gray-900 text-white flex items-center justify-center z-5">
        {counter}
      </div>
      <PokemonCard pokemon={pokemonDetails} reference="" />
    </div>
  );
}
