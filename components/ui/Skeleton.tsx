import { cn } from "@/lib/cn";

interface SkeletonGroupProps {
  length?: number;
  children: React.ReactNode;
}
type SkeletonProps = React.ComponentProps<"div">;

export function SkeletonGroup({ length = 4, children }: SkeletonGroupProps) {
  return <>{Array.from({ length }).map((_, index) => children)}</>;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "w-full h-full bg-gray-200 rounded animate-pulse",
        className
      )}
      {...props}
    ></div>
  );
}
