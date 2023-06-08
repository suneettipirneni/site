import type { PropsWithChildren } from "react";

export function Subtitle({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<h1 className={`${className} text-left text-lg sm:text-2xl`}>{children}</h1>
	);
}
