import { Fragment } from "react";
import type { Pokemon } from "@/types/Pokemon";

import { getPokemonTypeColor } from "@/utils/getPokemonTypeColor";

interface PokemonTypeProps {
  types: Pokemon["types"];
}

export default function PokemonType({ types }: PokemonTypeProps) {
  return (
    <div className="uppercase tracking-wider font-bold flex gap-2">
      {types.map((type, index) => (
        <Fragment key={type}>
          <span style={{ color: getPokemonTypeColor(type) }}>{type}</span>
          {index >= 0 && index < types.length - 1 && <> / </>}
        </Fragment>
      ))}
    </div>
  );
}
