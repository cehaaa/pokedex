import { cn } from "@/lib/cn";

type PokemonGridProps = React.ComponentProps<"div">;

export default function PokemonGrid({
  children,
  className,
  ...rest
}: PokemonGridProps) {
  return (
    <div className={cn("grid grid-cols-2 gap-3", className)} {...rest}>
      {children}
    </div>
  );
}
