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
		<header className="sticky top-0 z-40 w-full bg-background">
			<nav
				aria-label="Primary"
				className="flex h-[var(--site-nav)] w-full items-center justify-center px-[var(--site-panel)]"
			>
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
								aria-current={active ? "page" : undefined}
								className="text-muted-foreground underline-offset-8 hover:text-foreground hover:underline aria-[current=page]:text-foreground aria-[current=page]:underline"
							>
								{link.name}
							</NextLink>
						);
					})}
				</div>
			</nav>
		</header>
	);
}
