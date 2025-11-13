const BACK_ROUTE_MAP = {
	home: "/",
	search: "/search",
};

export function getBackRoute(ref: string) {
	const backRoute = BACK_ROUTE_MAP[ref as keyof typeof BACK_ROUTE_MAP];

	if (!backRoute) {
		return BACK_ROUTE_MAP["home"];
	}

	return backRoute;
}
