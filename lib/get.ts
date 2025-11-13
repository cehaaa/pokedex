import { get as lodashGet, defaultTo } from "lodash";

export function get<T extends object, R>(
	object: T,
	path: string,
	defaultValue?: R
): R {
	return defaultTo(lodashGet(object, path), defaultValue);
}
