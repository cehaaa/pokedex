import type { Pokemon, PokemonSpecies, PokemonAbility } from "@/types/Pokemon";

import { get } from "@/lib/get";
import map from "lodash/map";
import find from "lodash/find";
import startCase from "lodash/startCase";
import kebabCase from "lodash/kebabCase";

function getEnglishEntryOnly(entries: any[]) {
  return find(entries, (entry) => get(entry, "language.name", "") === "en");
}

export function normalizePokemonSpeciesResponse(species: any): PokemonSpecies {
  const descriptions = get(species, "flavorTextEntries", []);
  const description = getEnglishEntryOnly(descriptions);

  const genera = get(species, "genera", []);
  const genus = getEnglishEntryOnly(genera);

  return {
    color: get(species, "color.name", ""),
    description: get(description, "flavorText", ""),
    genus: get(genus, "genus", ""),
  };
}

export function normalizePokemonAbilitiesResponse(
  abilities: any
): PokemonAbility[] {
  return map(abilities, (ability) => ({
    name: get(ability, "ability.name", ""),
    description: get(ability, "ability.description", ""),
    effect: get(ability, "ability.effect", ""),
  }));
}

export function normalizePokemonResponse(pokemon: any): Pokemon {
  const types = get(pokemon, "types", []);
  const moves = get(pokemon, "moves", []);
  const stats = get(pokemon, "stats", []);
  const abilities = get(pokemon, "abilities", []);

  return {
    ...pokemon,
    slug: kebabCase(get(pokemon, "name", "")),
    name: startCase(get(pokemon, "name", "")),
    types: map(types, (type) => get(type, "type.name")),
    moves: map(moves, (move) => startCase(get(move, "move.name", ""))),
    stats: map(stats, (stat) => ({
      name: get(stat, "stat.name", ""),
      baseStat: get(stat, "baseStat"),
    })),
    abilities: map(abilities, (ability) => get(ability, "ability.name")),
  };
}
