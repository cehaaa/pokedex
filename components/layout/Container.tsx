import { cn } from "@/lib/cn";

interface ContainerProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export default function Container({
  children,
  className,
  ...props
}: ContainerProps) {
  return (
    <div className={cn("max-w-[360px] mx-auto", className)} {...props}>
      {children}
    </div>
  );
}
