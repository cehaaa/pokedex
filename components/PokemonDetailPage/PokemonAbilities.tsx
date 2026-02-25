"use client";

import { useMemo, useState } from "react";

import type { Ability } from "@/types/Ability";

import { cn } from "@/lib/cn";
import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";
import { useGetPokemonAbilities } from "@/hooks/pokemon/useGetPokemonAbilities";

import InfoCard from "../ui/InfoCard";

interface PokemonAbilitiesProps {
  name: string;
}
interface AbilityEffectProps {
  ability: Ability;
}

function AbilityEffect({ ability }: AbilityEffectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = useMemo(
    () => ability.effect.length > 100,
    [ability.effect]
  );

  return (
    <InfoCard
      key={ability.slug}
      title={ability.name}
      className="[&>h3]:text-zinc-900"
    >
      <div
        className={cn(
          "transition-all duration-300 mb-1.5",
          !isExpanded && "line-clamp-4"
        )}
      >
        {ability.effect}
      </div>
      {isLongText && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="ml-auto block text-[10px] cursor-pointer text-red-700"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}
    </InfoCard>
  );
}

export default function PokemonAbilities({ name }: PokemonAbilitiesProps) {
  const { data: pokemonDetails } = useGetPokemonDetails({ name });
  const { data: abilities } = useGetPokemonAbilities({
    abilities: pokemonDetails.abilities,
  });

  return (
    <div className="grid gap-3">
      {abilities.map((ability) => (
        <AbilityEffect key={ability.slug} ability={ability} />
      ))}
    </div>
  );
}
