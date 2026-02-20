import { PaginatedResponse } from ".";

export interface Pokemon {
  name: string;
  slug: string;
  order: number;
  height: number;
  weight: number;
  image: { default: string; artwork: string };
  types: string[];
  stats: { name: string; baseStat: number }[];
  moves: string[];
  abilities: string[];
}

export interface PokemonSpecies {
  color: string;
  description: string;
  genus: string;
  habitat: string;
}

export interface PokemonListResponse {
  url: string;
  name: string;
}

export type PokemonWithSpecies = Pokemon & PokemonSpecies;

export type PokemonListWithDetails = PaginatedResponse<Pokemon>;
