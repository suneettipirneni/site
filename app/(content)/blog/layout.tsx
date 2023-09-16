import { PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
	return <div className="flex w-full justify-center">{children}</div>;
}
