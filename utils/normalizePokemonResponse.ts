import type {
  Pokemon,
  PokemonSpecies,
  PokemonWithSpecies,
} from "@/types/Pokemon";

import { get } from "@/lib/get";
import map from "lodash/map";
import find from "lodash/find";
import startCase from "lodash/startCase";
import kebabCase from "lodash/kebabCase";

interface NormalizedPokemonResponseProps {
  pokemon: any;
  species?: any;
}

export function normalizePokemonResponse<
  T extends Pokemon | PokemonWithSpecies
>({ pokemon, species }: NormalizedPokemonResponseProps): T {
  const types = get(pokemon, "types", []);
  const moves = get(pokemon, "moves", []);
  const stats = get(pokemon, "stats", []);
  const abilities = get(pokemon, "abilities", []);

  const descriptions = get(species, "flavorTextEntries", []);
  const description = find(
    descriptions,
    (entry) => get(entry, "language.name", "") === "en"
  );

  const genera = get(species, "genera", []);
  const genus = find(
    genera,
    (genus) => get(genus, "language.name", "") === "en"
  );

  const baseResult = {
    ...pokemon,
    slug: kebabCase(get(pokemon, "name", "")),
    name: startCase(get(pokemon, "name", "")),
    image: {
      default: get(pokemon, "sprites.frontDefault", ""),
      artwork: get(pokemon, "sprites.other.officialArtwork.frontDefault", ""),
    },
    types: map(types, (type) => get(type, "type.name")),
    moves: map(moves, (move) => startCase(get(move, "move.name", ""))),
    stats: map(stats, (stat) => ({
      name: get(stat, "stat.name", ""),
      baseStat: get(stat, "baseStat"),
    })),
    abilities: map(abilities, (ability) => get(ability, "ability.name")),
  };

  const speciesResult: PokemonSpecies = species && {
    color: get(species, "color.name", ""),
    description: get(description, "flavorText", ""),
    genus: get(genus, "genus", ""),
  };

  return { ...baseResult, ...(species && { ...speciesResult }) } as T;
}
