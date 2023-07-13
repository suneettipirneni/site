"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
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

	// Determines if a tab is currently active based on the current path.
	const isActive = (tab: string) => tab.replaceAll("/", "") === segment;

	return (
		<div className="sticky top-0 z-50 flex h-[50px] w-full flex-row items-center justify-center border-b  border-gray-200 dark:border-gray-200/5 lg:h-nav lg:border-none">
			<div className="flex h-full w-[calc(850px_+_50px)] max-w-full flex-row items-center justify-between bg-white/80 p-3 bg-blend-saturation ring-1 ring-gray-200/75 backdrop-blur-xl dark:bg-black/50 dark:ring-gray-400/20 lg:h-[60px] lg:rounded-full lg:shadow-lg lg:shadow-gray-200/30 lg:dark:border-gray-200/25 lg:dark:shadow-none">
				<NextLink href="/" className="flex flex-row items-center">
					<Image
						src={profilePic}
						width={35}
						height={35}
						className="rounded-full ring-1 ring-gray-200"
						alt="About"
					/>
				</NextLink>

				<div className="flex max-h-[40px] flex-row rounded-full bg-gray-200/50 p-1 dark:bg-white/5">
					{tabs.map((tab, index) => (
						<NextLink
							key={tab.name}
							className={`relative z-10 flex flex-row items-center px-4 py-1 text-sm font-medium transition ${
								isActive(tab.href)
									? "text-black dark:text-white"
									: "text-black dark:text-white"
							}`}
							href={`/${tab.href}`}
						>
							{isActive(tab.href) && (
								<span
									key={`outer-${tab.name}`}
									className="absolute inset-0 -z-10 rounded-full bg-white shadow-sm dark:bg-white/20"
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
