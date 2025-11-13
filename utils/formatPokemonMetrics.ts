export function formatPokemonMetrics(number: number) {
	return new Intl.NumberFormat("us-EN", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1,
	}).format(number / 10);
}
