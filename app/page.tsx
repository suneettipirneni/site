import { AsciiBackdrop } from "@/components/about/AsciiBackdrop";
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
		<div className="home-page w-full">
			<section
				className="relative isolate flex items-center overflow-hidden py-6 sm:py-8 lg:py-10"
				aria-labelledby="intro-heading"
			>
				<AsciiBackdrop />
				<div className="relative z-10 mx-auto w-full max-w-[1120px] px-6 sm:px-10">
					<StaggeredEntrance className="flex min-w-0 flex-col gap-3">
						<EntranceItem>
							<h1
								id="intro-heading"
								className="max-w-[20ch] text-[2rem]/[1.125] font-medium tracking-tight [text-wrap:balance] sm:text-[2.5rem] lg:text-[3rem]"
							>
								Suneet Tipirneni
							</h1>
						</EntranceItem>
						<EntranceItem>
							<p className="text-sm/5 font-medium">
								AI Engineer{" "}
								<span className="text-muted-foreground">@ AdventHealth</span>
							</p>
						</EntranceItem>
						<EntranceItem>
							<p className="max-w-[40ch] text-lg/6 tracking-tight [text-wrap:pretty] sm:text-xl/7">
								I build useful software at the intersection of systems,
								interfaces, and machine learning.
							</p>
						</EntranceItem>
						<EntranceItem>
							<p className="max-w-[52ch] text-[0.9375rem]/6 [text-wrap:pretty] text-muted-foreground">
								My work spans computer vision, product engineering, and
								open-source software. I care about tools that are thoughtful,
								accessible, and genuinely useful.
							</p>
						</EntranceItem>
					</StaggeredEntrance>
				</div>
			</section>

			<div className="site-home-grid mx-auto w-full max-w-[1120px] px-6 sm:px-10">
				<aside className="min-w-0 py-4 sm:py-5">
					<StaggeredEntrance className="h-full">
						<EntranceItem>
							<section aria-labelledby="recent-posts-heading">
								<div className="flex items-center justify-between gap-3">
									<h2
										id="recent-posts-heading"
										className="text-base/6 font-semibold tracking-tight"
									>
										Recent posts
									</h2>
									<div className="type-caption shrink-0">
										<Link
											href="/blog"
											className="inline-flex min-h-[3rem] items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
										>
											All posts
											<HiArrowRight
												className="h-4 w-4 shrink-0"
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
					className="min-w-0 py-4 sm:py-5"
					aria-labelledby="projects-heading"
				>
					<div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
						<h2
							id="projects-heading"
							className="text-base/6 font-semibold tracking-tight"
						>
							Selected open source
						</h2>
						<a
							href="https://github.com/suneettipirneni?tab=repositories"
							target="_blank"
							rel="noopener noreferrer"
							className="type-caption inline-flex min-h-[3rem] shrink-0 items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
						>
							View all on GitHub
							<HiArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
						</a>
					</div>
					<Suspense fallback={<RepoListSkeleton />}>
						<Repos />
					</Suspense>
				</section>

				<footer className="py-3 lg:col-span-2">
					<nav aria-label="Social links">
						<ul role="list" className="flex flex-wrap gap-x-6 gap-y-1">
							{socialLinks.map(({ label, href, icon: Icon }) => (
								<li key={label} className="text-sm/5">
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										className="group inline-flex min-h-[3rem] items-center gap-2 text-muted-foreground hover:text-foreground"
									>
										<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
										<span className="underline-offset-4 group-hover:underline">
											{label}
										</span>
									</a>
								</li>
							))}
						</ul>
					</nav>
				</footer>
			</div>
		</div>
	);
}

async function RecentPosts() {
	const posts = (await getPosts())
		.filter((post) => process.env.NODE_ENV !== "production" || !post.draft)
		.toSorted(
			(a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
		)
		.slice(0, 3);

	return (
		<ul role="list" className="pt-2">
			{posts.map((post) => (
				<li key={post.slug}>
					<Link
						href={post.url}
						className="group flex min-h-16 min-w-0 items-start gap-3 py-3"
					>
						<div className="flex min-w-0 grow flex-col gap-1">
							<p className="line-clamp-2 text-sm/5 font-medium tracking-tight underline-offset-4 group-hover:underline">
								{post.title}
							</p>
							<div className="type-caption text-muted-foreground">
								<time dateTime={post.datetime.toISOString()}>
									{formatDatetime(post.datetime)}
								</time>
							</div>
						</div>
						<HiArrowRight
							className="h-4 w-4 shrink-0 self-start text-muted-foreground group-hover:text-foreground"
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
		<div className="flex flex-col pt-2" aria-label="Loading posts">
			{Array.from({ length: 3 }).map((_, index) => (
				<div
					key={index}
					aria-hidden="true"
					className="flex min-h-16 flex-col justify-center gap-1 py-3"
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
		<div className="flex flex-col pt-2" aria-label="Loading repositories">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					aria-hidden="true"
					className="flex min-h-20 flex-col justify-center gap-1 py-3"
				>
					<div className="h-4 w-2/5 bg-muted" />
					<div className="h-3 w-4/5 bg-muted" />
				</div>
			))}
		</div>
	);
}
