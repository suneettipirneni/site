import { Profile } from "@/components/about/Profile";
import { ProfileSkeleton } from "@/components/about/ProfileSkeleton";
import profileBg from "../public/profile-bg.webp";
import profileBgDark from "../public/profile-bg-dark.webp";
import Image from "next/image";
import { Repos } from "@/components/about/Repos";
import { ReposSkeleton } from "@/components/about/ReposSkeleton";
import { Section } from "@/components/about/Section";
import {
	FaDiscord,
	FaGithub,
	SiBluesky,
	FaLinkedin,
} from "@/lib/icons";
import { ContactButton } from "@/components/about/ContactButton";
import { Suspense } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Technologies section for better code splitting
const TechnologiesSection = dynamic(() => 
	import("@/components/about/TechnologiesSection").then(mod => ({ default: mod.TechnologiesSection })), 
	{
		loading: () => (
			<Section title="Technologies & Frameworks" className="gap-y-5 font-semibold">
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="space-y-3">
							<div className="h-5 w-32 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
							<div className="flex flex-wrap gap-3">
								{Array.from({ length: 6 }).map((_, j) => (
									<div key={j} className="h-6 w-6 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
								))}
							</div>
						</div>
					))}
				</div>
			</Section>
		),
		ssr: false,
	}
);

export default function Home() {
	return (
		<div className="mx-auto flex max-w-[600px] grow flex-col items-center justify-center space-y-10 overflow-hidden bg-fixed bg-center px-5 pb-10 md:space-y-10 md:px-0">
			<picture>
				<source
					srcSet={profileBgDark.src}
					media="(prefers-color-scheme: dark)"
				/>
				<Image
					src={profileBg}
					alt=""
					placeholder="blur"
					className="fixed inset-0 -z-10 hidden aspect-video w-full bg-fixed object-cover md:visible"
					priority
					sizes="100vw"
					quality={85}
				/>
			</picture>

			<Suspense fallback={<ProfileSkeleton />}>
				<Profile />
			</Suspense>
			<div className="!mt-2 flex flex-row gap-x-2 self-start">
				<ContactButton
					url="https://bsky.app/profile/suneettipirneni.dev"
					icon={<SiBluesky size={20} />}
					title="Follow me on Bluesky"
				/>
				<ContactButton
					url="https://www.linkedin.com/in/suneettipirneni/"
					icon={<FaLinkedin size={20} />}
					title="Connect with me on LinkedIn"
				/>
				<ContactButton
					url="https://github.com/suneettipirneni"
					icon={<FaGithub size={20} />}
					title="Check out my GitHub profile"
				/>
				<ContactButton
					url="https://discordapp.com/users/386337006764032002"
					icon={<FaDiscord size={20} />}
					title="Chat with me on Discord"
				/>
			</div>
			<Section title="About Me">
				<span className="w-full max-w-[600px] text-gray-600 dark:text-gray-400">
					{
						"I'm a student and avid open source developer currently pursuing a master's degree in computer vision. I'm passionate about building tools that are accessible and useful to others."
					}
				</span>
			</Section>

			<Section title="Open Source Projects">
				<Suspense fallback={<ReposSkeleton />}>
					<Repos />
				</Suspense>
			</Section>
			<TechnologiesSection />
		</div>
	);
}
