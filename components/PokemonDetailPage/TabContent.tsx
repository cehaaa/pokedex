"use client";

import { useSearchParams } from "next/navigation";

import { Tab } from "@/constants/pokemonDetailTabs";

import PokemonAbout from "./PokemonAbout";
import PokemonAbilities from "./PokemonAbilities";
import PokemonMoves from "./PokemonMoves";
import PokemonEvolutions from "./PokemonEvolutions";

interface TabContentProps {
  name: string;
}

type ContentMap = Record<Tab, React.ComponentType<{ name: string }>>;

const CONTENT_MAP: ContentMap = {
  [Tab.ABOUT]: PokemonAbout,
  [Tab.ABILITIES]: PokemonAbilities,
  [Tab.MOVES]: PokemonMoves,
  [Tab.EVOLUTIONS]: PokemonEvolutions,
};

export default function TabContent({ name }: TabContentProps) {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") as Tab;

  const Component = CONTENT_MAP[activeTab || Tab.ABOUT];

  return <Component name={name} />;
}
