import type { ReactNode } from "react";

export default function WorkLayout({ children }: { children: ReactNode }) {
	return <div className="flex w-full justify-center">{children}</div>;
}
