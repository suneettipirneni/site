import type { PropsWithChildren } from "react";

export function HeroText({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<h1 className={`${className} text-left text-2xl font-bold sm:text-5xl`}>
			{children}
		</h1>
	);
}
