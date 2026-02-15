import type { PokemonWithSpecies } from "@/types/Pokemon";
import { getPokemonStatName } from "@/utils/getPokemonStatName";
import ProgressBar from "@/components/ui/ProgressBar";

interface PokemonStatsProps {
  stats: PokemonWithSpecies["stats"];
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="grid gap-1">
      {stats.map((stat) => (
        <div key={stat.name} className="flex gap-5 items-center">
          <div className="text-zinc-400 min-w-13">
            {getPokemonStatName(stat.name)}
          </div>
          <div className="font-medium min-w-8 text-center">{stat.baseStat}</div>
          <div className="w-full">
            <ProgressBar value={stat.baseStat} />
          </div>
        </div>
      ))}
    </div>
  );
}
