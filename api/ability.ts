import { http } from "@/lib/http";

export async function getAbilityByName(name: string) {
  const { data } = await http.get(`/ability/${name}`);
  return data;
}
