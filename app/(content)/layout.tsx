import Footer from "@/components/Footer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="flex min-h-[calc(100dvh-var(--site-nav))] w-full flex-col">
			<div className="grow">{children}</div>
			<div className="w-full border-x border-border">
				<Footer />
			</div>
		</div>
	);
}
