"use client";

import NextLink from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Link = motion(NextLink);

export function TabBar({
	tabs,
}: {
	tabs: { name: string; href: string; icon?: ReactNode }[];
}) {
	const path = usePathname();

	const isActive = (tab: string) =>
		tab.replaceAll("/", "") === path.toLowerCase().replaceAll("/", "");

	return (
		<div className="z-0 flex flex-row justify-between rounded-full border border-gray-400/10 bg-black/5 p-1 shadow-sm backdrop-blur dark:border-gray-800 dark:bg-black/30">
			{tabs.map((tab, index) => (
				<Link
					key={tab.name}
					layout
					className={`text-md relative z-10 flex flex-row items-center justify-between px-4 py-1 font-[600] transition lg:text-2xl ${
						isActive(tab.href)
							? "text-black dark:text-black"
							: "text-black/70 dark:text-white"
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
							className="absolute inset-0 -z-10 rounded-full bg-white dark:bg-white"
						/>
					)}

					<motion.h1 layout>{`${tab.name}`}</motion.h1>
				</Link>
			))}
		</div>
	);
}
