import { ViewTransition, type PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
	return (
		<ViewTransition>
			<div className="w-full min-w-0">{children}</div>
		</ViewTransition>
	);
}
