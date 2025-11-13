import type { PokemonWithSpecies } from "@/types/Pokemon";
import { formatPokemonMetrics } from "@/utils";

import InfoCard from "@/components/UI/InfoCard";
import PokemonStats from "@/components/PokemonDetailPage/PokemonStats";

interface PokemonAboutProps {
	stats: PokemonWithSpecies["stats"];
	height: number;
	weight: number;
	description: string;
	genus: string;
}

export default function PokemonAbout({
	description,
	stats,
	height,
	weight,
	genus,
}: PokemonAboutProps) {
	return (
		<div className='grid grid-cols-2 gap-3'>
			<InfoCard title='description' className='col-span-2'>
				<p className='text-base'>{description}</p>
			</InfoCard>
			<InfoCard title='Genus' className='col-span-2'>
				{genus}
			</InfoCard>
			<InfoCard title='Weight'>{formatPokemonMetrics(weight)} Kg</InfoCard>
			<InfoCard title='Height'>{formatPokemonMetrics(height)} M</InfoCard>
			<InfoCard title='Stats' className='col-span-2'>
				<PokemonStats stats={stats} />
			</InfoCard>
		</div>
	);
}
