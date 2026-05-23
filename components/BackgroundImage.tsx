import { PropsWithChildren } from "react";

export function BackgroundImage({
	className = "",
	children,
}: PropsWithChildren<{ className?: string }>) {
	return <div className={className}>{children}</div>;
}
