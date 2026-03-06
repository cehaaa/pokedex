"use client";

import { notFound } from "next/navigation";

import { getBackRoute } from "@/utils/getBackRoute";
import { formatPokemonOder } from "@/utils/formatPokemonOrder";
import { getPokemonImage } from "@/utils/getPokemonImage";

import { useGetPokemonDetails } from "@/hooks/pokemon/useGetPokemonDetails";

import Image from "next/image";
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

  const { data: pokemon } = useGetPokemonDetails({ name });

  if (!pokemon) {
    return notFound();
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
          <section className="mb-5 group">
            <div className="relative bg-zinc-200/50 mb-1">
              <div className="aspect-square w-[200px] mx-auto z-20 group ">
                <Image
                  src={getPokemonImage({ image: pokemon.sprites })}
                  alt={pokemon.name}
                  width={1080}
                  height={1080}
                  loading="eager"
                  className="group-hover:hidden"
                />
                <Image
                  src={`https://play.pokemonshowdown.com/sprites/ani/${pokemon.slug}.gif`}
                  alt={pokemon.name}
                  width={1080}
                  height={1080}
                  loading="eager"
                  className="absolute inset-0 size-[180px] object-contain mx-auto hidden group-hover:block"
                />
              </div>
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
            <TabContent name={name} />
          </section>
        </MobileContainer>
      </main>
    </>
  );
}
