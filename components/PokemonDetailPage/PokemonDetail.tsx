"use client";

import { notFound } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { PokemonWithSpecies } from "@/types/Pokemon";

import { getPokemonDetailsByName } from "@/api/pokemon";

import { getBackRoute } from "@/utils/getBackRoute";
import { formatPokemonOder } from "@/utils/formatPokemonOrder";
import { getPokemonQueryKey } from "@/utils/getPokemonQueryKey";

import Image from "next/image";
import { PlayIcon } from "@heroicons/react/16/solid";
import Button from "@/components/ui/Button";
import AppBar from "@/components/layout/AppBar";
import PokemonType from "@/components/PokemonDetailPage/PokemonType";
import Tabs from "@/components/PokemonDetailPage/Tabs";
import TabContent from "@/components/PokemonDetailPage/TabContent";
import StickyHeader from "@/components/layout/StickyHeader";
import MobileContainer from "@/components/layout/MobileContainer";

interface PokemonDetailProps {
  name: string;
  backRef: string;
}

const constructBackRoute = (ref: string, name?: string) => {
  const backRoute = getBackRoute(ref);
  if (backRoute === "/search" && name) {
    const searchParams = new URLSearchParams();
    searchParams.set("name", name.split("-").join(" "));
    return `${backRoute}?${searchParams.toString()}`;
  }
  return backRoute;
};

export default function PokemonDetail({ name, backRef }: PokemonDetailProps) {
  const backRoute = constructBackRoute(backRef, name);

  const { data: pokemon } = useQuery<PokemonWithSpecies>({
    queryKey: getPokemonQueryKey(name),
    queryFn: async () => {
      return await getPokemonDetailsByName({ name, withSpecies: true });
    },
  });

  if (!pokemon) {
    notFound();
  }

  return (
    <>
      <StickyHeader>
        <AppBar
          withBackButton
          backRoute={backRoute}
          title={formatPokemonOder({ number: pokemon.order })}
          titleClassName="text-center"
          className="mb-0"
        >
          <div className="invisible" aria-hidden="true"></div>
        </AppBar>
      </StickyHeader>

      <main>
        <MobileContainer className="pt-5" withMinHeight>
          <section className="relative mb-5 bg-zinc-200/50">
            <div className="relative aspect-square w-[200px] mx-auto z-20">
              <Image
                src={pokemon.image.artwork}
                alt={pokemon.name}
                width={1080}
                height={1080}
                loading="eager"
              />
            </div>
            <div className="absolute -bottom-2 -right-2">
              <Button className="rounded-full flex items-center justify-center p-0 size-8">
                <PlayIcon className="size-4" />
              </Button>
            </div>
          </section>

          <section className="mb-2">
            <h1 className="text-2xl font-bold tracking-wider uppercase text-center mb-2">
              {pokemon.name}
            </h1>
            <div className="flex justify-center">
              <PokemonType types={pokemon.types} />
            </div>
          </section>

          <section className="sticky top-14 bg-zinc-50 z-10 -mx-4 py-3 px-4 mb-2">
            <Tabs />
          </section>

          <section>
            <TabContent pokemon={pokemon} />
          </section>
        </MobileContainer>
      </main>
    </>
  );
}
