import axios from "axios";
import { notFound } from "next/navigation";

import type { PokemonWithSpecies } from "@/types/Pokemon";

import { formatPokemonOder, getBackRoute } from "@/utils";
import { getPokemonDetailsByName } from "@/api/pokemon";

import Image from "next/image";
import AppBar from "@/components/layout/AppBar";
import PokemonType from "@/components/PokemonDetailPage/PokemonType";
import Tabs from "@/components/PokemonDetailPage/Tabs";
import TabContent from "@/components/PokemonDetailPage/TabContent";
import StickyHeader from "@/components/layout/StickyHeader";
import MobileContainer from "@/components/layout/MobileContainer";

interface PageProps {
	params: Promise<{ name: string }>;
	searchParams: Promise<{ ref: string }>;
}

async function fetchPokemon(name: string) {
	try {
		return await getPokemonDetailsByName<PokemonWithSpecies>({
			name,
			withSpecies: true,
		});
	} catch (error) {
		if (axios.isAxiosError(error) && error.response?.status === 404) {
			notFound();
		}
		throw error;
	}
}

const constructBackRoute = (ref: string, name?: string) => {
	const backRoute = getBackRoute(ref);
	if (backRoute === "/search" && name) {
		const searchParams = new URLSearchParams();
		searchParams.set("q", name);
		return `${backRoute}?${searchParams.toString()}`;
	}
	return backRoute;
};

export default async function Page({ params, searchParams }: PageProps) {
	const { name } = await params;
	const { ref } = await searchParams;

	const pokemon = await fetchPokemon(name);
	const backRoute = constructBackRoute(ref, name);

	return (
		<>
			<StickyHeader>
				<AppBar
					withBackButton
					backRoute={backRoute}
					title={formatPokemonOder({ number: pokemon.order })}
					titleClassName='text-center'
					className='mb-0'
				>
					<div className='invisible' aria-hidden='true'></div>
				</AppBar>
			</StickyHeader>

			<main>
				<MobileContainer className='pt-5' withMinHeight>
					<section className='relative bg-zinc-200/50 mb-5'>
						<div className='relative aspect-square w-[200px] mx-auto z-20'>
							<Image
								src={pokemon.image}
								alt={pokemon.name}
								width={1080}
								height={1080}
							/>
						</div>
					</section>

					<section className='mb-2'>
						<h1 className='text-2xl font-bold tracking-wider uppercase text-center mb-2'>
							{pokemon.name}
						</h1>
						<div className='flex justify-center'>
							<PokemonType types={pokemon.types} />
						</div>
					</section>

					<section className='sticky top-14 bg-zinc-50 z-10 -mx-4 py-3 px-4 mb-2'>
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
