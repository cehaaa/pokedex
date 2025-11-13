import PokemonGrid from "@/components/layout/PokemonGrid";

const SKELETON_LENGTH = 10;

interface SkeletonGroupProps {
	length?: number;
}

export default function SkeletonGroup({
	length = SKELETON_LENGTH,
}: SkeletonGroupProps) {
	const skeletons = Array.from({ length });

	return (
		<PokemonGrid>
			{skeletons.map((_, index) => (
				<figure key={index} className='w-full'>
					<div className='w-full h-30 bg-zinc-200 animate-pulse mb-2'></div>
					<div className='w-3/4 h-3 bg-zinc-200 animate-pulse mb-8'></div>
					<div className='w-1/3 h-2 bg-zinc-200 animate-pulse'></div>
				</figure>
			))}
		</PokemonGrid>
	);
}
