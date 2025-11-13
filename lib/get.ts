import { get as lodashGet, defaultTo } from "lodash";

export function get<T>(object: T, path: string, defaultValue?: any): any {
	return defaultTo(lodashGet(object, path), defaultValue);
}
