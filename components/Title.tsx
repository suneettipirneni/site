import type { PropsWithChildren } from "react";

export function Title({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<h1 className={`${className} text-left text-2xl font-bold lg:text-3xl`}>
			{children}
		</h1>
	);
}
