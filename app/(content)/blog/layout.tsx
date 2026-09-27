import type { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
	return <div className="w-full min-w-0">{children}</div>;
}
