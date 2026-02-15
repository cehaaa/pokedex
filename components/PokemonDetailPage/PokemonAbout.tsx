import type { PokemonWithSpecies } from "@/types/Pokemon";
import { formatPokemonMetrics } from "@/utils/formatPokemonMetrics";

import InfoCard from "@/components/ui/InfoCard";
import PokemonStats from "@/components/PokemonDetailPage/PokemonStats";

interface PokemonAboutProps {
  stats: PokemonWithSpecies["stats"];
  height: number;
  weight: number;
  description: string;
  genus: string;
}

export default function PokemonAbout({
  description,
  stats,
  height,
  weight,
  genus,
}: PokemonAboutProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <InfoCard title="description" className="col-span-2">
        <p>{description}</p>
      </InfoCard>
      <InfoCard title="Genus" className="col-span-2">
        <p>{genus}</p>
      </InfoCard>
      <InfoCard title="Weight">
        <p>{formatPokemonMetrics(weight)} Kg</p>
      </InfoCard>
      <InfoCard title="Height">
        <p>{formatPokemonMetrics(height)} M</p>
      </InfoCard>
      <InfoCard title="Stats" className="col-span-2">
        <PokemonStats stats={stats} />
      </InfoCard>
    </div>
  );
}
