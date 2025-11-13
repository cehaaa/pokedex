import { cn } from "@/lib";

type StickyHeaderProps = React.ComponentProps<"header">;

export default function StickyHeader({
	children,
	className,
	...props
}: StickyHeaderProps) {
	return (
		<header className={cn("sticky top-0 z-30", className)} {...props}>
			{children}
		</header>
	);
}
