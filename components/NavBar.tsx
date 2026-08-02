"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ name: "Home", href: "/" },
	{ name: "Blog", href: "/blog" },
] as const;

export function NavBar() {
	const pathname = usePathname();

	return (
		<header className="sticky top-0 z-40 w-full bg-background [view-transition-name:site-header]">
			<nav
				aria-label="Primary"
				className="flex h-[var(--site-nav)] w-full items-center px-[var(--site-panel)]"
			>
				<div className="flex flex-1 items-center">
					<NextLink
						href="/"
						aria-label="Homepage"
						className="font-semibold tracking-tight underline-offset-4 hover:underline"
					>
						ST
					</NextLink>
				</div>
				<div className="type-nav flex items-center gap-5">
					{links.map((link) => {
						const active =
							link.href === "/"
								? pathname === "/"
								: pathname.startsWith(link.href);
						return (
							<NextLink
								key={link.href}
								href={link.href}
								transitionTypes={[
									link.href === "/" ? "nav-back" : "nav-forward",
								]}
								aria-current={active ? "page" : undefined}
								className="text-muted-foreground underline-offset-8 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline"
							>
								{link.name}
							</NextLink>
						);
					})}
				</div>
				<div className="type-nav flex flex-1 items-center justify-end">
					<a
						href="https://github.com/suneettipirneni"
						target="_blank"
						rel="noopener noreferrer"
						className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
					>
						GitHub
					</a>
				</div>
			</nav>
		</header>
	);
}
