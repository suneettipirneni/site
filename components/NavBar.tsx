"use client";

import NextLink from "next/link";
import type { ReactNode } from "react";
import { useSelectedLayoutSegment } from "next/navigation";
import { motion } from "framer-motion";
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
		<div className="sticky top-0 z-50 flex h-[60px] w-full flex-row items-center justify-center border-b  border-gray-200 dark:border-gray-200/25 lg:h-nav lg:border-none">
			<div className="flex h-full w-[calc(850px_+_50px)] max-w-full flex-row justify-between bg-white/80 p-2 bg-blend-saturation backdrop-blur-xl dark:bg-black/50 lg:h-auto lg:rounded-full lg:border lg:border-gray-200 lg:shadow-sm lg:dark:border-gray-200/25">
				<NextLink href="/" className="flex flex-row items-center">
					<Image
						src={profilePic}
						width={35}
						height={35}
						className="rounded-full border border-gray-400/50"
						alt="About"
					/>
				</NextLink>

				<div className="flex flex-row rounded-full bg-black/5 p-1 dark:bg-white/5">
					{tabs.map((tab, index) => (
						<NextLink
							key={tab.name}
							className={`relative z-10 flex flex-row items-center px-4 py-1 text-sm font-semibold transition ${
								isActive(tab.href)
									? "text-black dark:text-white"
									: "text-black dark:text-white"
							}`}
							href={`/${tab.href}`}
						>
							{isActive(tab.href) && (
								<motion.span
									key={`outer-${tab.name}`}
									layout
									transition={{
										type: "spring",
										duration: 0.5,
									}}
									layoutId="selectedTab"
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
