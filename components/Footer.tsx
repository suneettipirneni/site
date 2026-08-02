import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiBluesky } from "react-icons/si";

const links = [
	{
		label: "GitHub",
		href: "https://github.com/suneettipirneni",
		icon: FaGithub,
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/suneettipirneni/",
		icon: FaLinkedin,
	},
	{
		label: "Bluesky",
		href: "https://bsky.app/profile/suneettipirneni.dev",
		icon: SiBluesky,
	},
	{
		label: "Discord",
		href: "https://discordapp.com/users/386337006764032002",
		icon: FaDiscord,
	},
] as const;

export default function Footer() {
	return (
		<footer className="border-t border-border">
			<div className="type-caption grid min-h-[calc(var(--site-footer)-1px)] items-center gap-y-3 px-5 py-4 text-muted-foreground sm:px-6 lg:grid-cols-[var(--site-rail)_minmax(0,1fr)_auto] lg:gap-y-0 lg:py-0">
				<p>© 2026 Suneet Tipirneni</p>
				<p className="hidden lg:block">Building in public. Shipping quietly.</p>
				<nav aria-label="Social links">
					<ul
						role="list"
						className="flex flex-wrap items-center gap-5 sm:gap-7"
					>
						{links.map(({ label, href, icon: Icon }) => (
							<li key={label}>
								<a
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2 font-normal text-foreground underline-offset-4 hover:underline"
								>
									<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
									{label}
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</footer>
	);
}
