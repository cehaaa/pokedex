import { cn } from "@/lib";

type SpinnerProps = React.ComponentProps<"div">;

export default function Spinner({ className, ...props }: SpinnerProps) {
	return (
		<div
			className={cn(
				"animate-spin rounded-full border-3 border-zinc-300 border-t-transparent size-5",
				className
			)}
			{...props}
		/>
	);
}
