import padStart from "lodash/padStart";

interface FormatPokemonNumberProps {
	number: number;
	length?: number;
}
export function formatPokemonOder({
	number,
	length = 4,
}: FormatPokemonNumberProps) {
	return `#${padStart(number.toString(), length, "0")}`;
}
