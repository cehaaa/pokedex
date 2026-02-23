import InfoCard from "../ui/InfoCard";

interface PokemonAbilitiesProps {
  abilities: string[];
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="grid gap-3">
      {abilities.map((ability) => (
        <InfoCard key={ability} title={ability} />
      ))}
    </div>
  );
}
