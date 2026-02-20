interface PokemonAbilitiesProps {
  abilities: string[];
}

export default function PokemonAbilities({ abilities }: PokemonAbilitiesProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {abilities.map((ability) => (
        <div key={ability}>{ability}</div>
      ))}
    </div>
  );
}
