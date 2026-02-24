import { PaginatedResponse } from ".";
import { Species } from "./Species";

export interface Pokemon {
  name: string;
  slug: string;
  order: number;
  height: number;
  weight: number;
  types: string[];
  stats: PokemonStat[];
  moves: string[];
  abilities: string[];
  sprites: Record<string, any>;
}

export interface PokemonStat {
  name: string;
  baseStat: number;
}

export interface PokemonListResponse {
  url: string;
  name: string;
}

export type PokemonDetails = Pokemon & Species;

export type PokemonListWithDetails = PaginatedResponse<Pokemon>;
