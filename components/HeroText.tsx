import type { PropsWithChildren } from "react";

export function HeroText({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<h1
			className={`${className} text-left text-xl font-bold md:text-3xl lg:text-5xl`}
		>
			{children}
		</h1>
	);
}
