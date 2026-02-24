import { formatPokemonMetrics } from "@/utils/formatPokemonMetrics";

import InfoCard from "@/components/ui/InfoCard";
import PokemonStats from "@/components/PokemonDetailPage/PokemonStats";

import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import { useGetPokemonSpecies } from "@/hooks/pokemon/useGetPokemonSpecies";

interface PokemonAboutProps {
  name: string;
}

export default function PokemonAbout({ name }: PokemonAboutProps) {
  const { data: pokemonDetails } = useGetPokemonDetails({ name });
  const { data: pokemonSpecies } = useGetPokemonSpecies({ name });

  return (
    <div className="grid grid-cols-2 gap-3">
      <InfoCard title="description" className="col-span-2">
        <p>{pokemonSpecies.description}</p>
      </InfoCard>
      <InfoCard title="Genus" className="col-span-2">
        <p>{pokemonSpecies.genus}</p>
      </InfoCard>
      <InfoCard title="Weight">
        <p>{formatPokemonMetrics(pokemonDetails.weight)} Kg</p>
      </InfoCard>
      <InfoCard title="Height">
        <p>{formatPokemonMetrics(pokemonDetails.height)} M</p>
      </InfoCard>
      <InfoCard title="Stats" className="col-span-2">
        <PokemonStats stats={pokemonDetails.stats} />
      </InfoCard>
    </div>
  );
}
