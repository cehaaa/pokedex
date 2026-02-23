"use client";

import { useSearchParams } from "next/navigation";

import type { PokemonDetails } from "@/types/Pokemon";
import { Tab } from "@/app/[name]/constants";

import PokemonAbout from "./PokemonAbout";
import PokemonAbilities from "./PokemonAbilities";
import PokemonMoves from "./PokemonMoves";

interface TabContentProps {
  pokemonDetails: PokemonDetails;
}

type ContentMap = Record<
  Tab,
  {
    Component: React.ComponentType<any>;
    getComponentProps?: (pokemonDetails: PokemonDetails) => any;
  }
>;

const CONTENT_MAP: ContentMap = {
  [Tab.ABOUT]: {
    Component: PokemonAbout,
    getComponentProps: (pokemonDetails: PokemonDetails) => {
      return {
        description: pokemonDetails.description,
        stats: pokemonDetails.stats,
        height: pokemonDetails.height,
        weight: pokemonDetails.weight,
        genus: pokemonDetails.genus,
      };
    },
  },
  [Tab.ABILITIES]: {
    Component: PokemonAbilities,
    getComponentProps: (pokemonDetails: PokemonDetails) => ({
      abilities: pokemonDetails.abilities,
    }),
  },
  [Tab.MOVES]: {
    Component: PokemonMoves,
    getComponentProps: (pokemonDetails: PokemonDetails) => ({
      moves: pokemonDetails.moves,
    }),
  },
  [Tab.EVOLUTIONS]: {
    Component: () => <div>Evolutions</div>,
  },
};

export default function TabContent({ pokemonDetails }: TabContentProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as Tab;

  const { Component, getComponentProps } = CONTENT_MAP[activeTab || Tab.ABOUT];
  const componentProps = getComponentProps?.(pokemonDetails) || {};

  return (
    <>
      <h2 className="text-lg font-bold tracking-wider uppercase mb-2">
        {activeTab}
      </h2>
      <Component {...componentProps} />
    </>
  );
}
