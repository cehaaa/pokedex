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
}

function PokemonEvolution({ name }: PokemonEvolutionProps) {
  const { data: pokemonDetails } = useGetPokemonDetails({ name });

  return (
    <div
      className={cn(
        "max-w-[158px] mx-auto relative",
        "after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:w-0.5 after:h-12 after:border-l-2 after:border-dashed after:border-zinc-400",
        "last:after:hidden"
      )}
    >
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
    <div className="space-y-12">
      {evolutionChain.map((species) => (
        <PokemonEvolution key={species} name={species} />
      ))}
    </div>
  );
}
