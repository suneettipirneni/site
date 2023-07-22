"use client";

import NextLink from "next/link";
import { useEffect, type ReactNode, useState, useMemo } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import Image from "next/image";
import profilePic from "@/public/me.png";

/**
 * Represents a navigation tab.
 */
interface Tab {
	/**
	 * The name of the tab.
	 */
	name: string;
	/**
	 * The href of the tab.
	 */
	href: string;
	/**
	 * The icon of the tab.
	 */
	icon?: ReactNode;
}

/**
 * Props for the `NavBar` component.
 */
export interface NavBarProps {
	/**
	 * An array of navigation tabs to display in the `NavBar` component.
	 */
	tabs: Tab[];
}

export function NavBar({ tabs }: NavBarProps) {
	const segment = useSelectedLayoutSegment() ?? "home";
	const [shouldShowBackground, setShouldShowBackground] = useState(false);

	const handleScroll = (e: Event) => {
		if (window.scrollY > 50) {
			setShouldShowBackground(true);
			return;
		}

		setShouldShowBackground(false);
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

	// Determines if a tab is currently active based on the current path.
	const isActive = useMemo(
		() => (tab: string) => tab.replaceAll("/", "") === segment,
		[segment]
	);

	const withBackgroundStyle =
		"bg-white/80 dark:bg-black/50 dark:ring-gray-400/20 ring-gray-200/75 ring-1 backdrop-blur-xl lg:shadow-lg lg:shadow-gray-200/30";

	return (
		<div
			className={`sticky top-0 z-50 flex w-full flex-row items-center justify-center border-gray-200
				
			 p-0 lg:h-[70px]  lg:border-none lg:p-1`}
		>
			<div
				className={`flex h-full w-[calc(850px_+_50px)] max-w-full flex-row items-center justify-between ${
					shouldShowBackground ? withBackgroundStyle : "bg-transparent"
				} p-5 bg-blend-saturation transition-colors md:p-3 lg:h-[60px] lg:rounded-full  lg:dark:border-gray-200/25 lg:dark:shadow-none`}
			>
				<NextLink href="/" className="flex flex-row items-center">
					<Image
						src={profilePic}
						width={35}
						height={35}
						className="rounded-full ring-1 ring-gray-200 dark:ring-gray-400/20"
						alt="About"
					/>
				</NextLink>

				<div className="flex max-h-[40px] flex-row p-1">
					{tabs.map((tab, index) => (
						<NextLink
							key={tab.name}
							className={`relative z-10 flex flex-row items-center px-4 py-1 text-sm font-medium transition-all ${
								isActive(tab.href) && "text-white dark:text-black"
							}`}
							href={`/${tab.href}`}
						>
							{isActive(tab.href) && (
								<span
									key={`outer-${tab.name}`}
									className="absolute inset-0 -z-10 rounded-full bg-black/90 text-white dark:bg-white"
								/>
							)}

							<h1>{tab.name}</h1>
						</NextLink>
					))}
				</div>
			</div>
		</div>
	);
}
