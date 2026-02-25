import { http } from "@/lib/http";
import { normalizePokemonEvolutionChainResponse } from "@/utils/normalizePokemonResponse";

export async function getEvolutionChain(id: number) {
  const { data } = await http.get(`/evolution-chain/${id}`);
  return normalizePokemonEvolutionChainResponse(data);
}
