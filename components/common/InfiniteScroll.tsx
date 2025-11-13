"use client";

import { useRef, useEffect, useCallback, memo, type ReactNode } from "react";
import { cn } from "@/lib";

interface InfiniteScrollProps extends React.ComponentProps<"div"> {
	isLoading?: boolean;
	children: ReactNode;
	observerOptions?: IntersectionObserverInit;
	onIntersect: () => void;
	renderLoader?: () => ReactNode;
}

const DEFAULT_OBSERVER_OPTIONS: IntersectionObserverInit = {
	threshold: 0.1,
	rootMargin: "100px",
};

function InfiniteScroll({
	isLoading,
	children,
	className,
	observerOptions = DEFAULT_OBSERVER_OPTIONS,
	onIntersect,
	renderLoader,
	...rest
}: InfiniteScrollProps) {
	const loadMoreRef = useRef<HTMLDivElement>(null);

	const handleObserver = useCallback(
		(entries: IntersectionObserverEntry[]) => {
			const [target] = entries;
			if (target.isIntersecting) {
				onIntersect();
			}
		},
		[onIntersect]
	);

	useEffect(() => {
		const element = loadMoreRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(handleObserver, observerOptions);

		observer.observe(element);
		return () => observer.disconnect();
	}, [handleObserver, observerOptions]);

	return (
		<div className={cn(className)} {...rest}>
			{children}
			<div ref={loadMoreRef}></div>
			{isLoading && renderLoader && (
				<div className='pt-3'>{renderLoader()}</div>
			)}
		</div>
	);
}

export default memo(InfiniteScroll);
