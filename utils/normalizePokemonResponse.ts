import type { Pokemon } from "@/types/Pokemon";
import type { Ability } from "@/types/Ability";
import type { Species } from "@/types/Species";

import { get } from "@/lib/get";
import map from "lodash/map";
import find from "lodash/find";
import last from "lodash/last";
import split from "lodash/split";
import parseInt from "lodash/parseInt";
import startCase from "lodash/startCase";
import kebabCase from "lodash/kebabCase";

function getEnglishEntryOnly(entries: any[]) {
  return find(entries, (entry) => get(entry, "language.name", "") === "en");
}

function getEvolutionChainId(evolutionChainUrl: string) {
  const splittedEvolutionChain = split(evolutionChainUrl, "/evolution-chain/");
  const lastSplittedEvolutionChain = last(splittedEvolutionChain); // will be like "<EVOLUTION_CHAIN_ID>/"
  return parseInt(lastSplittedEvolutionChain || "0");
}

export function normalizePokemonSpeciesResponse(species: any): Species {
  const descriptions = get(species, "flavorTextEntries", []);
  const description = getEnglishEntryOnly(descriptions);

  const genera = get(species, "genera", []);
  const genus = getEnglishEntryOnly(genera);

  const evolutionChainUrl = get(species, "evolutionChain.url", "");
  const evolutionChainId = getEvolutionChainId(evolutionChainUrl);

  return {
    color: get(species, "color.name", ""),
    description: get(description, "flavorText", ""),
    genus: get(genus, "genus", ""),
    evolutionChainId,
  };
}

export function normalizePokemonAbilityResponse(ability: any): Ability {
  const names = get(ability, "names", []);
  const name = getEnglishEntryOnly(names);

  const effects = get(ability, "effectEntries", []);
  const effect = getEnglishEntryOnly(effects);

  return {
    slug: get(ability, "name"),
    name: get(name, "name", ""),
    effect: get(effect, "effect", ""),
  };
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
