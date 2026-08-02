import { PropsWithChildren } from "react";

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
	const directionClassName =
		direction === "horizontal" ? "fade-scroll-x" : "fade-scroll-y";

	return <div className={`${directionClassName} ${className}`}>{children}</div>;
}
