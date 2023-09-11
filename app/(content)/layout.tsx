import Footer from "@/components/Footer";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className="mx-auto flex w-full flex-col">
			<div className="grow">{children}</div>
			<Footer />
		</div>
	);
}
