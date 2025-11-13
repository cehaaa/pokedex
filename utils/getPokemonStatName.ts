export function getPokemonStatName(name: string) {
	const names: Record<string, string> = {
		hp: "HP",
		attack: "Attack",
		defense: "Defense",
		"special-attack": "Sp. Atk",
		"special-defense": "Sp. Def",
		speed: "Speed",
	};
	return names[name] || name;
}
