"use client";

import { PropsWithChildren, UIEventHandler, useState } from "react";
import { ScrollArea } from "./ScrollArea";
import Footer from "./Footer";
import { NavBar } from "./NavBar";

const bgStyle =
	"bg-white/80 dark:bg-black/50 dark:ring-gray-400/20 ring-gray-200/75 ring-1 backdrop-blur-xl lg:shadow-lg lg:shadow-gray-200/30";

export function PageShell({ children }: PropsWithChildren) {
	const [shouldShowNavBackground, setShouldShowNavBackground] = useState(false);

	const onScroll: UIEventHandler<HTMLDivElement> = (event) => {
		const scrollY = event.currentTarget.scrollTop;

		if (scrollY > 20) {
			setShouldShowNavBackground(true);
			return;
		}

		setShouldShowNavBackground(false);
	};

	return (
		<ScrollArea
			className="relative flex grow bg-cover bg-no-repeat"
			onScroll={onScroll}
		>
			<NavBar
				className={`max-w-screen ${
					shouldShowNavBackground ? bgStyle : "bg-transparent"
				}`}
				tabs={[
					{
						name: "Blog",
						href: "blog/",
					},
					{
						name: "Projects",
						href: "projects/",
					},
				]}
			/>
			<div className="flex h-screen w-screen max-w-screen grow flex-col p-2 md:p-5">
				{children}
			</div>
			<Footer />
		</ScrollArea>
	);
}
