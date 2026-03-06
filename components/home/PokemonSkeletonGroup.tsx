import PokemonGrid from "../layout/PokemonGrid";
import { SkeletonGroup, Skeleton } from "@/components/ui/Skeleton";

export function SkeletonCard() {
  return (
    <Skeleton className="w-full bg-gray-100 p-3">
      <Skeleton className="w-full h-30 mb-2" />
      <Skeleton className="w-3/4 h-3 mb-8" />
      <Skeleton className="w-1/3 h-2" />
    </Skeleton>
  );
}

export function PokemonSkeletonGroup() {
  return (
    <PokemonGrid>
      <SkeletonGroup length={10}>
        <SkeletonCard />
      </SkeletonGroup>
    </PokemonGrid>
  );
}
