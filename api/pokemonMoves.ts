import kebabCase from "lodash/kebabCase";
import { http } from "@/lib/http";

export interface GetPokemonMovesByNameProps {
  name: string;
}
export async function getPokemonMovesByName({
  name,
}: GetPokemonMovesByNameProps) {
  const { data } = await http.get(`/move/${kebabCase(name)}`);
  return data;
}
