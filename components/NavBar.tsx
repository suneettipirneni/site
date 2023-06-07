"use client";

import NextLink from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import profilePic from "@/public/me.png";

const Link = motion(NextLink);

export function NavBar({
	tabs,
}: {
	tabs: { name: string; href: string; icon?: ReactNode }[];
}) {
	const path = usePathname();

	const isActive = (tab: string) =>
		tab.replaceAll("/", "") === path.toLowerCase().replaceAll("/", "");

	return (
		<div className="sticky top-0 z-50 flex h-nav w-full flex-row items-center justify-center border-b border-gray-300 bg-gray-50/50 p-1 px-4 py-2 backdrop-blur-xl dark:border-white/20 dark:bg-black/50">
			<div className="flex w-full max-w-[1000px] flex-row justify-between">
				<Link href="/" layout className="flex flex-row items-center">
					<Image
						src={profilePic}
						width={35}
						height={35}
						className="rounded-full border border-gray-400/50"
						alt="About"
					/>
				</Link>

				<div className="flex flex-row">
					{tabs.map((tab, index) => (
						<Link
							key={tab.name}
							layout
							className={`text-md lg:text-md relative z-10 flex flex-row items-end px-4 py-1 font-[600] transition ${
								isActive(tab.href)
									? "text-black dark:text-white"
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
									className="absolute inset-0 -z-10 rounded-lg bg-black/10 dark:bg-white/20"
								/>
							)}

							<motion.h1 layout>{`${tab.name}`}</motion.h1>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
