import padStart from "lodash/padStart";
import kebabCase from "lodash/kebabCase";
import type { PokemonWithSpecies } from "@/types/Pokemon";
import { cn } from "@/lib";
import Link from "next/link";

interface PokemonMovesProps {
	moves: PokemonWithSpecies["moves"];
}

function MoveItem({ number, move }: { number: number; move: string }) {
	return (
		<Link
			href={`/moves/${kebabCase(move)}`}
			className={cn(
				"capitalize px-3 py-2 border border-zinc-200 font-mono text-xs hover:border-red-700 duration-200 group"
			)}
		>
			<p>
				<span className='mr-1 text-zinc-400'>
					{padStart(number.toString(), 2, "0")}.
				</span>
				<span className='group-hover:underline group-hover:text-red-700 underline-offset-2'>
					{move}
				</span>
			</p>
		</Link>
	);
}

export default function PokemonMoves({ moves }: PokemonMovesProps) {
	return (
		<div className='grid grid-cols-2 gap-3'>
			{moves.map((move, index) => (
				<MoveItem key={move} move={move} number={index + 1} />
			))}
		</div>
	);
}
