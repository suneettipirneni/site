"use client";

import { PropsWithChildren, useCallback, useState } from "react";

export interface FadedScrollProps extends PropsWithChildren {
	className?: string;
	/**
	 * The direction of the scrollable container.
	 */
	direction?: "horizontal" | "vertical";
}

/**
 * Adds a fade-out effect to the start and end of the scrollable container.
 */
export function FadedScroll({
	className = "",
	direction = "vertical",
	children,
}: FadedScrollProps) {
	const [shouldFadeStart, setShouldFadeStart] = useState(false);

	const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
		const target = e.target as HTMLDivElement;
		const scrollLeft = target.scrollLeft;

		setShouldFadeStart(scrollLeft > 0);
	}, []);

	const directionClassName =
		direction === "horizontal"
			? shouldFadeStart
				? "fade-x"
				: "fade-right"
			: shouldFadeStart
			? "fade-y"
			: "fade-bottom";

	return (
		<div className={`${directionClassName} ${className}`} onScroll={onScroll}>
			{children}
		</div>
	);
}
