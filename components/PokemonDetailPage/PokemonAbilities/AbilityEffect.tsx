"use client";

import { useMemo, useState } from "react";
import type { Ability } from "@/types/Ability";
import { cn } from "@/lib/cn";
import InfoCard from "@/components/ui/InfoCard";

interface AbilityEffectProps {
  ability: Ability;
}

export default function AbilityEffect({ ability }: AbilityEffectProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const isLongText = useMemo(
    () => ability.effect.length > 200,
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
