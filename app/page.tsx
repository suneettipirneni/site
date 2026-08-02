import { Repos } from "@/components/about/Repos";
import Footer from "@/components/Footer";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import Link from "next/link";
import { Suspense } from "react";
import { HiArrowRight, HiArrowUpRight } from "react-icons/hi2";

const metadata = [
	["Role", "Open-source developer"],
	["Focus", "Computer vision"],
	["Education", "Master’s student"],
	["Interests", "Systems, interfaces, machine learning"],
] as const;

const tools = [
	["Languages", "Rust, Python, C++, Haskell, Swift"],
	["Web", "React, TypeScript, Next.js, Tailwind"],
	["ML & vision", "PyTorch, scikit-learn"],
	["Data", "NumPy, pandas"],
	["Infra", "Docker, Node.js"],
	["Cloud", "AWS, Cloudflare"],
	["Tools", "Git, GitHub, VS Code"],
] as const;

export default function Home() {
	return (
		<div className="flex min-h-[calc(100dvh-var(--site-nav))] w-full flex-col border-x border-border">
			<div className="site-home-grid grow">
				<aside className="order-2 border-b border-border lg:order-none lg:row-span-2 lg:border-b-0 lg:border-r">
					<StaggeredEntrance className="flex h-full flex-col gap-8 p-[var(--site-panel)]">
						<EntranceItem>
							<section aria-labelledby="metadata-heading">
								<h2 id="metadata-heading" className="type-label">
									Metadata
								</h2>
								<dl className="mt-4 text-[0.8125rem] leading-5">
									{metadata.map(([term, detail]) => (
										<div
											key={term}
											className="site-list-row grid min-h-[var(--site-row-sm)] grid-cols-[7rem_minmax(0,1fr)] items-center gap-4 py-2"
										>
											<dt className="font-medium">{term}</dt>
											<dd className="text-pretty text-muted-foreground">
												{detail}
											</dd>
										</div>
									))}
								</dl>
							</section>
						</EntranceItem>

						<EntranceItem>
							<section aria-labelledby="links-heading">
								<h2 id="links-heading" className="type-label">
									Links
								</h2>
								<Link
									href="/blog"
									transitionTypes={["nav-forward"]}
									className="type-body-small mt-3 flex min-h-[var(--site-row-sm)] items-center justify-between border-b border-foreground/70 underline-offset-4 hover:underline"
								>
									Read the blog
									<HiArrowRight className="h-4 w-4" aria-hidden="true" />
								</Link>
							</section>
						</EntranceItem>
					</StaggeredEntrance>
				</aside>

				<section
					className="order-1 flex min-h-[var(--site-hero)] items-center border-b border-border px-[var(--site-hero-panel)] py-8 lg:order-none"
					aria-labelledby="intro-heading"
				>
					<StaggeredEntrance className="flex w-full max-w-[800px] flex-col gap-5">
						<EntranceItem>
							<h1 id="intro-heading" className="type-display max-w-[20ch]">
								Suneet Tipirneni
							</h1>
						</EntranceItem>
						<EntranceItem>
							<p className="type-lead max-w-[34ch]">
								I build useful software at the intersection of systems,
								interfaces, and machine learning.
							</p>
						</EntranceItem>
						<EntranceItem>
							<p className="type-body max-w-[52ch] text-muted-foreground">
								I’m a student and open-source developer currently pursuing a
								master’s degree in computer vision. I care about tools that are
								thoughtful, accessible, and genuinely useful.
							</p>
						</EntranceItem>
					</StaggeredEntrance>
				</section>

				<div className="site-home-lower-grid order-3 lg:col-start-2">
					<section
						className="min-w-0 border-b border-border p-[var(--site-panel)] lg:border-b-0 lg:border-r"
						aria-labelledby="projects-heading"
					>
						<div className="flex items-center justify-between gap-4">
							<h2 id="projects-heading" className="type-section-title">
								Selected open source
							</h2>
							<a
								href="https://github.com/suneettipirneni?tab=repositories"
								target="_blank"
								rel="noopener noreferrer"
								className="type-caption inline-flex shrink-0 items-center gap-1.5 text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
							>
								View all on GitHub
								<HiArrowUpRight
									className="h-4 w-4 shrink-0"
									aria-hidden="true"
								/>
							</a>
						</div>
						<Suspense fallback={<RepoListSkeleton />}>
							<Repos />
						</Suspense>
					</section>

					<section
						className="min-w-0 p-[var(--site-panel)]"
						aria-labelledby="tools-heading"
					>
						<h2 id="tools-heading" className="type-section-title">
							Tools I reach for
						</h2>
						<dl className="mt-4">
							{tools.map(([term, detail]) => (
								<div
									key={term}
									className="site-list-row grid min-h-[var(--site-row-sm)] grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 py-2"
								>
									<dt className="type-label">{term}</dt>
									<dd className="type-body-small text-muted-foreground">
										{detail}
									</dd>
								</div>
							))}
						</dl>
					</section>
				</div>
			</div>
			<Footer />
		</div>
	);
}

function RepoListSkeleton() {
	return (
		<div className="mt-4 flex flex-col" aria-label="Loading repositories">
			{Array.from({ length: 4 }).map((_, index) => (
				<div
					key={index}
					aria-hidden="true"
					className="site-list-row flex min-h-[var(--site-row-lg)] flex-col justify-center gap-2"
				>
					<div className="h-4 w-2/5 bg-muted" />
					<div className="h-3 w-4/5 bg-muted" />
				</div>
			))}
		</div>
	);
}
