import { cn } from "@/lib/cn";

type ButtonProps = React.ComponentProps<"button">;

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "bg-gray-900 text-white p-2 group relative overflow-hidden cursor-pointer flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-red-700 transition-all duration-200 h-0 group-hover:h-full z-10"></div>
      <div className="relative z-20">{children}</div>
    </button>
  );
}
