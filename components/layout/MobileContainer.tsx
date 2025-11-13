"use client";

import { cn } from "@/lib";
import { APP_BAR_MAX_HEIGHT } from "@/components/layout/AppBar";
import Container from "@/components/layout/Container";

interface MobileContainerProps extends React.ComponentProps<"div"> {
	noPadding?: boolean;
	withMinHeight?: boolean;
}

export default function MobileContainer({
	children,
	className,
	noPadding = false,
	withMinHeight = false,
	...props
}: MobileContainerProps) {
	return (
		<Container
			className={cn(
				"py-3 bg-zinc-50 px-4",
				noPadding && "p-0",
				withMinHeight && `min-h-[calc(100vh-${APP_BAR_MAX_HEIGHT}px)]`,
				className
			)}
			{...props}
		>
			{children}
		</Container>
	);
}
