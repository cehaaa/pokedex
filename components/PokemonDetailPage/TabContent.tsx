"use client";

import { useSearchParams } from "next/navigation";

import type { PokemonWithSpecies } from "@/types/Pokemon";
import { Tab } from "@/app/[name]/constants";

import PokemonAbout from "./PokemonAbout";
import PokemonAbilities from "./PokemonAbilities";
import PokemonMoves from "./PokemonMoves";

interface TabContentProps {
  pokemon: PokemonWithSpecies;
}

type ContentMap = Record<
  Tab,
  {
    Component: React.ComponentType<any>;
    getComponentProps?: (pokemon: PokemonWithSpecies) => any;
  }
>;

const CONTENT_MAP: ContentMap = {
  [Tab.ABOUT]: {
    Component: PokemonAbout,
    getComponentProps: (pokemon: PokemonWithSpecies) => ({
      description: pokemon.description,
      stats: pokemon.stats,
      height: pokemon.height,
      weight: pokemon.weight,
      genus: pokemon.genus,
    }),
  },
  [Tab.ABILITIES]: {
    Component: PokemonAbilities,
    getComponentProps: (pokemon: PokemonWithSpecies) => ({
      abilities: pokemon.abilities,
    }),
  },
  [Tab.MOVES]: {
    Component: PokemonMoves,
    getComponentProps: (pokemon: PokemonWithSpecies) => ({
      moves: pokemon.moves,
    }),
  },
  [Tab.EVOLUTIONS]: {
    Component: () => <div>Evolutions</div>,
  },
};

export default function TabContent({ pokemon }: TabContentProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as Tab;

  const { Component, getComponentProps } = CONTENT_MAP[activeTab || Tab.ABOUT];
  const componentProps = getComponentProps?.(pokemon) || {};

  return (
    <>
      <h2 className="text-lg font-bold tracking-wider uppercase mb-2">
        {activeTab}
      </h2>
      <Component {...componentProps} />
    </>
  );
}
