import type { Pokemon } from "@/types/Pokemon";

import { Tab } from "@/app/[name]/constants";
import { formatPokemonOder } from "@/utils";

import Image from "next/image";
import Link from "next/link";

interface PokemonCardProps {
	pokemon: Pokemon;
	reference?: string;
}

function constructHref(pokemon: Pokemon, ref?: string) {
	const queryParams = new URLSearchParams();
	queryParams.set("tab", Tab.ABOUT);

	if (ref) {
		queryParams.set("ref", ref);
	}

	return `/${pokemon.slug}?${queryParams.toString()}`;
}

function PokemonType({ types }: { types: Pokemon["types"] }) {
	return (
		<p className='text-[8px] uppercase text-white z-10'>
			{types.map((name, index) => (
				<span key={name}>
					{name}
					{index >= 0 && index < types.length - 1 && <> &middot; </>}
				</span>
			))}
		</p>
	);
}

export default function PokemonCard({ pokemon, reference }: PokemonCardProps) {
	const href = constructHref(pokemon, reference);

	return (
		<figure className='bg-white text-xs group overflow-hidden relative'>
			<div className='absolute top-2 w-full text-center px-3 text-zinc-500 font-bold tracking-wider text-sm'>
				<div>{formatPokemonOder({ number: pokemon.order })}</div>
			</div>
			<div className='bg-zinc-100 pt-9'>
				<Link href={href}>
					<Image
						src={pokemon.image}
						alt={pokemon.name}
						width={300}
						height={300}
						className='w-[100px] h-[100px] object-contain aspect-square mx-auto'
					/>
				</Link>
			</div>
			<div className='p-3 relative bg-gray-900 text-white'>
				<div className='h-1 bg-red-700 -my-3 -mx-3 absolute w-full group-hover:h-full transition-all duration-200'></div>

				<div className='relative z-10'>
					<Link href={href}>
						<h3 className='tracking-wider font-semibold uppercase mb-8 z-10 group-hover:underline underline-offset-2'>
							{pokemon.name}
						</h3>
					</Link>
					<PokemonType types={pokemon.types} />
				</div>
			</div>
		</figure>
	);
}
