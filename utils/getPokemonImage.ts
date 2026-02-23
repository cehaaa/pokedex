import { get } from "@/lib/get";

interface GetPokemonImageProps {
  image: Record<string, any>;
}

export function getPokemonImage({ image }: GetPokemonImageProps) {
  const defaultImage = get(image, "frontDefault");
  const artworkImage = get(image, "other.officialArtwork.frontDefault");

  if (artworkImage) return artworkImage;

  return defaultImage;
}
