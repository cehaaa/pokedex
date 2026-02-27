import { cn } from "@/lib/cn";
import { useGetPokemonSpecies } from "@/hooks/pokemon/useGetPokemonSpecies";
import { useGetPokemonEvolutions } from "@/hooks/pokemon/useGetPokemonEvolutions";
import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import PokemonCard from "../home/PokemonCard";

interface PokemonEvolutionsProps {
  name: string;
}
interface PokemonEvolutionProps {
  name: string;
  counter: number;
}

function PokemonEvolution({ name, counter }: PokemonEvolutionProps) {
  const { data: pokemonDetails } = useGetPokemonDetails({ name });

  return (
    <div
      className={cn(
        "max-w-[158px] mx-auto relative",
        "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0.5 after:h-12 after:border-l-2 after:border-dashed after:border-zinc-400",
        "last:after:hidden"
      )}
    >
      <div className="absolute -left-4 -top-4 size-8 rounded-full bg-gray-900 text-white flex items-center justify-center z-5">
        {counter}
      </div>
      <PokemonCard pokemon={pokemonDetails} reference="" />
    </div>
  );
}

export default function PokemonEvolutions({ name }: PokemonEvolutionsProps) {
  const { data: pokemonSpecies } = useGetPokemonSpecies({ name });
  const { data: evolutionChain } = useGetPokemonEvolutions(
    pokemonSpecies.evolutionChainId
  );

  return (
    <div className="space-y-12 pt-4">
      {evolutionChain.map((species, counter) => (
        <PokemonEvolution key={species} name={species} counter={counter + 1} />
      ))}
    </div>
  );
}
