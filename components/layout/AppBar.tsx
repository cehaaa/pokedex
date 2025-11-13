"use client";

import { cn } from "@/lib";
import { useRouter } from "next/navigation";

import Button from "@/components/UI/Button";
import { ChevronLeft } from "@/components/UI/Icon";
import MobileContainer from "@/components/layout/MobileContainer";

export const APP_BAR_MAX_HEIGHT = 57 as const;

interface AppBarProps extends Omit<React.ComponentProps<"div">, "title"> {
	title?: string | React.ReactNode;
	titleClassName?: string;
	withBackButton?: boolean;
	backRoute?: string;
	onBackButtonClick?: () => void;
}

export default function AppBar({
	title,
	titleClassName,
	children,
	className,
	withBackButton = false,
	backRoute,
	onBackButtonClick,
	...props
}: AppBarProps) {
	const router = useRouter();

	const handleBackButtonClick = () => {
		if (onBackButtonClick) {
			onBackButtonClick();
		}

		if (backRoute) {
			router.push(backRoute);
		} else {
			router.back();
		}
	};

	return (
		<MobileContainer
			className={cn(
				"border-b border-zinc-300 bg-white",
				`max-h-[${APP_BAR_MAX_HEIGHT}px]`,
				className
			)}
			{...props}
		>
			<nav className='grid grid-cols-3 items-center'>
				{withBackButton && (
					<div>
						<Button onClick={handleBackButtonClick}>
							<ChevronLeft className='size-4' strokeWidth={2} />
						</Button>
					</div>
				)}

				{typeof title === "string" ? (
					<div
						className={cn(
							"font-medium text-base",
							withBackButton && "text-center",
							titleClassName
						)}
					>
						<h1>{title}</h1>
					</div>
				) : (
					title
				)}

				{children}
			</nav>
		</MobileContainer>
	);
}
