import { AsciiBackdrop } from "@/components/about/AsciiBackdrop";
import { HeroPortrait } from "@/components/about/HeroPortrait";
import { Repos } from "@/components/about/Repos";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import { formatDatetime } from "@/lib/formatDate";
import { getPosts } from "@/lib/post";
import Link from "next/link";
import { Suspense } from "react";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";
import { SiBluesky } from "react-icons/si";

const socialLinks = [
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

export default function Home() {
	return (
		<div className="flex min-h-[calc(100dvh-var(--site-nav))] w-full flex-col">
			<div className="site-home-grid grow">
				<section
					className="relative isolate flex min-h-[var(--site-hero)] items-center overflow-hidden p-[var(--site-panel)] lg:col-span-3"
					aria-labelledby="intro-heading"
				>
					<AsciiBackdrop />
					<div className="relative z-10 grid w-full max-w-[880px] grid-cols-1 items-start gap-4 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6">
						<HeroPortrait className="hidden w-16 sm:block" />
						<StaggeredEntrance className="flex min-w-0 flex-col gap-3 sm:gap-4">
							<EntranceItem>
								<h1 id="intro-heading" className="type-display max-w-[20ch]">
									Suneet Tipirneni
								</h1>
							</EntranceItem>
							<EntranceItem>
								<p className="type-body-small font-medium">
									AI Engineer{" "}
									<span className="text-muted-foreground">@ AdventHealth</span>
								</p>
							</EntranceItem>
							<EntranceItem>
								<p className="type-lead max-w-[34ch]">
									I build useful software at the intersection of systems,
									interfaces, and machine learning.
								</p>
							</EntranceItem>
							<EntranceItem>
								<p className="type-body max-w-[52ch] text-muted-foreground">
									My work spans computer vision, product engineering, and
									open-source software. I care about tools that are thoughtful,
									accessible, and genuinely useful.
								</p>
							</EntranceItem>
						</StaggeredEntrance>
					</div>
				</section>

				<aside className="min-w-0 p-[var(--site-panel)]">
					<StaggeredEntrance className="h-full">
						<EntranceItem>
							<section aria-labelledby="recent-posts-heading">
								<div className="flex items-center justify-between gap-3">
									<h2 id="recent-posts-heading" className="type-section-title">
										Recent posts
									</h2>
									<div className="type-caption shrink-0">
										<Link
											href="/blog"
											transitionTypes={["nav-forward"]}
											className="min-h-12 inline-flex items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:min-h-0"
										>
											All posts
											<HiArrowRight
												className="size-4 shrink-0"
												aria-hidden="true"
											/>
										</Link>
									</div>
								</div>
								<Suspense fallback={<RecentPostsSkeleton />}>
									<RecentPosts />
								</Suspense>
							</section>
						</EntranceItem>
					</StaggeredEntrance>
				</aside>

				<section
					className="min-w-0 p-[var(--site-panel)]"
					aria-labelledby="projects-heading"
				>
					<div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
						<h2 id="projects-heading" className="type-section-title">
							Selected open source
						</h2>
						<a
							href="https://github.com/suneettipirneni?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
							className="type-caption min-h-12 inline-flex shrink-0 items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:min-h-0"
						>
							View all on GitHub
							<HiArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
						</a>
					</div>
					<Suspense fallback={<RepoListSkeleton />}>
						<Repos />
					</Suspense>
				</section>

				<section
					className="min-w-0 p-[var(--site-panel)]"
					aria-labelledby="social-heading"
				>
					<h2 id="social-heading" className="type-section-title">
						Social links
					</h2>
					<nav aria-label="Social links" className="mt-2 sm:mt-3">
						<ul role="list">
							{socialLinks.map(({ label, href, icon: Icon }) => (
								<li key={label}>
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="type-body-small group flex min-h-[var(--site-row-sm)] items-center justify-between gap-4 py-2 text-muted-foreground hover:text-foreground"
									>
										<span className="flex items-center gap-2.5">
											<Icon className="size-4 shrink-0" aria-hidden="true" />
											<span className="underline-offset-4 group-hover:underline">
												{label}
											</span>
										</span>
										<HiArrowUpRight
											className="size-4 shrink-0"
											aria-hidden="true"
										/>
									</a>
								</li>
							))}
						</ul>
					</nav>
				</section>
			</div>
		</div>
	);
}

async function RecentPosts() {
	const posts = (await getPosts())
		.filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
		.toSorted(
			(a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
		)
		.slice(0, 3);

	return (
		<ul role="list" className="mt-1 sm:mt-2">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link
						href={post.url}
						transitionTypes={["nav-forward"]}
						className="group flex min-h-[var(--site-row-lg)] min-w-0 items-center gap-3 py-2.5 sm:py-2"
					>
						<div className="flex min-w-0 grow flex-col gap-0.5">
							<p className="type-body-small line-clamp-2 font-medium tracking-tight underline-offset-4 group-hover:underline">
								{post.title}
							</p>
							<div className="type-caption text-muted-foreground">
								<time dateTime={post.datetime.toISOString()}>
									{formatDatetime(post.datetime)}
								</time>
							</div>
						</div>
						<HiArrowRight
							className="size-4 shrink-0 text-muted-foreground group-hover:text-foreground"
							aria-hidden="true"
						/>
					</Link>
				</li>
			))}
		</ul>
	);
}

function RecentPostsSkeleton() {
	return (
		<div className="mt-1 flex flex-col sm:mt-2" aria-label="Loading posts">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					aria-hidden="true"
					className="flex min-h-[var(--site-row-lg)] flex-col justify-center gap-2 py-2.5 sm:py-2"
				>
					<div className="h-4 w-4/5 bg-muted" />
					<div className="h-3 w-2/5 bg-muted" />
				</div>
			))}
		</div>
	);
}

function RepoListSkeleton() {
	return (
		<div className="mt-3 flex flex-col" aria-label="Loading repositories">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					aria-hidden="true"
					className="flex min-h-[var(--site-row-lg)] flex-col justify-center gap-2"
				>
					<div className="h-4 w-2/5 bg-muted" />
					<div className="h-3 w-4/5 bg-muted" />
				</div>
			))}
		</div>
	);
}
