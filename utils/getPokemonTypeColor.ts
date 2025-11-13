export function getPokemonTypeColor(type: string) {
	const colors: Record<string, string> = {
		fire: "#f08030",
		water: "#6890f0",
		grass: "#78C850",
		electric: "#f8d030",
		psychic: "#f85888",
		ice: "#98d8d8",
		dragon: "#7038f8",
		dark: "#705848",
		fairy: "#ee99ac",
		poison: "#a040a0",
		normal: "#a8a878",
	};
	return colors[type] || "#ccc";
}
