import { cn } from "@/lib/cn";

interface InfoCardProps extends React.ComponentProps<"div"> {
  title: string;
}

export default function InfoCard({
  title,
  children,
  className,
  ...props
}: InfoCardProps) {
  return (
    <div
      className={cn("border border-zinc-200 px-3 py-2", className)}
      {...props}
    >
      <h3 className="font-mono uppercase tracking-wider text-xs font-bold text-zinc-400 mb-1.5">
        {title}
      </h3>
      {children}
    </div>
  );
}
