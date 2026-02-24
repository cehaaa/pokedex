import { cn } from "@/lib/cn";
import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import { useGetPokemonAbilities } from "@/hooks/pokemon/useGetPokemonAbilities";
import InfoCard from "../ui/InfoCard";

interface PokemonAbilitiesProps {
  name: string;
}

export default function PokemonAbilities({ name }: PokemonAbilitiesProps) {
  const { data: pokemonDetails } = useGetPokemonDetails({ name });
  const { data: abilities } = useGetPokemonAbilities({
    abilities: pokemonDetails.abilities,
  });

  return (
    <div className="grid gap-3">
      {abilities.map((ability) => (
        <InfoCard
          key={ability.slug}
          title={ability.name}
          className="[&>h3]:text-zinc-900"
        >
          <div
            className={cn(
              "-mx-3 grid gap-1",
              "[&>p]:px-3 [&>p]:border-l-2 [&>p]:cursor-pointer [&>p]:duration-200 [&>p]:border-zinc-300 [&>p]:hover:border-red-700"
            )}
          >
            <p>{ability.description}</p>
            <p>{ability.effect}</p>
          </div>
        </InfoCard>
      ))}
    </div>
  );
}
