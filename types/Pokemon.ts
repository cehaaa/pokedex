import { PaginatedResponse } from ".";

export interface Pokemon {
  name: string;
  slug: string;
  order: number;
  height: number;
  weight: number;
  types: string[];
  stats: { name: string; baseStat: number }[];
  moves: string[];
  abilities: string[];
  sprites: Record<string, any>;
}

export interface PokemonSpecies {
  color: string;
  description: string;
  genus: string;
}

export interface PokemonAbility {
  name: string;
  description: string;
  effect: string;
}

export interface PokemonListResponse {
  url: string;
  name: string;
}

export type PokemonDetails = Pokemon & PokemonSpecies & PokemonAbility[];

export type PokemonListWithDetails = PaginatedResponse<Pokemon>;
