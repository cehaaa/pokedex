import type { PokemonStat } from "@/types/Pokemon";
import { getPokemonStatName } from "@/utils/getPokemonStatName";
import { Progress, Bar } from "@/components/ui/ProgressBar";

interface PokemonStatsProps {
  stats: PokemonStat[];
}
interface StatItemProps {
  name: string;
  baseStat: number;
}

function StatItem({ name, baseStat }: StatItemProps) {
  return (
    <div className="flex gap-5 items-center group/stat cursor-pointer">
      <div className="text-zinc-400 min-w-13 group-hover/stat:text-zinc-900 transition-all duration-200">
        {getPokemonStatName(name)}
      </div>
      <div className="font-medium min-w-8 text-center">{baseStat}</div>
      <div className="w-full">
        <Bar value={baseStat} />
      </div>
    </div>
  );
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  const total = stats.reduce((acc, stat) => acc + stat.baseStat, 0);

  const allValues = [...stats.map((stat) => stat.baseStat), total];
  const maxStatValue = Math.max(...allValues);

  const defaultMax = 200;
  const maxValue = maxStatValue >= defaultMax ? maxStatValue + 100 : defaultMax;

  return (
    <Progress maxValue={maxValue}>
      <div className="grid gap-1">
        {stats.map((stat) => (
          <StatItem key={stat.name} name={stat.name} baseStat={stat.baseStat} />
        ))}
        <StatItem name="Total" baseStat={total} />
      </div>
    </Progress>
  );
}
