"use client";

import NextLink from "next/link";
import { useEffect, type ReactNode, useState, useMemo } from "react";
import { useSelectedLayoutSegments } from "next/navigation";
import Image from "next/image";
import profilePic from "@/public/me.webp";

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
	const segments = useSelectedLayoutSegments();
	const segment = segments.length > 1 ? segments[1] : "home";
	const [shouldShowTopFade, setShouldShowTopFade] = useState(false);

	const handleScroll = () => {
		const shouldFade = window.scrollY > 50;

		setShouldShowTopFade((previous) =>
			previous === shouldFade ? previous : shouldFade
		);
	};

	useEffect(() => {
		const animationFrame = window.requestAnimationFrame(handleScroll);
		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Determines if a tab is currently active based on the current path.
	const isActive = useMemo(
		() => (tab: string) => tab.replaceAll("/", "") === segment,
		[segment]
	);

	const shouldShowAvatar = segment !== "home" || shouldShowTopFade;

	return (
		<>
			<div
				aria-hidden="true"
				className="pointer-events-none fixed inset-x-0 top-0 z-40 h-28 bg-gradient-to-b from-slate-50 via-slate-50/80 to-transparent dark:from-zinc-950 dark:via-zinc-950/80"
			/>
			<div
				className={`sticky top-0 z-50 flex w-full flex-row items-center justify-center border-gray-200
				
			 p-0 lg:h-[70px]  lg:border-none lg:p-1`}
			>
				<div
					className="flex h-full w-[calc(850px_+_50px)] max-w-full flex-row items-center justify-between bg-transparent p-5 bg-blend-saturation md:p-3 lg:h-[60px]"
				>
					<NextLink
						href="/"
						className={`flex flex-row items-center ${
							!shouldShowAvatar ? "pointer-events-none cursor-none" : ""
						}`}
					>
						<Image
							src={profilePic}
							width={35}
							height={35}
							className={`${
								!shouldShowAvatar ? "opacity-0" : ""
							} rounded-full ring-1 ring-gray-200 transition-all dark:ring-gray-400/20`}
							alt="About"
						/>
					</NextLink>

					<div className="flex max-h-[40px] flex-row p-1">
						{tabs.map((tab) => (
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
		</>
	);
}
