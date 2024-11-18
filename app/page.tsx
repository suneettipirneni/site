import { Profile } from "@/components/about/Profile";
import profileBg from "../public/profile-bg.webp";
import profileBgDark from "../public/profile-bg-dark.webp";
import Image from "next/image";
import { Repos } from "@/components/about/Repos";
import {
	FaDiscord,
	FaGithub,
	FaJava,
	FaLinkedin,
	FaReact,
	FaSwift,
} from "react-icons/fa";
import { Section } from "@/components/about/Section";
import {
	SiAmazons3,
	SiAstro,
	SiAwslambda,
	SiBluesky,
	SiC,
	SiCloudflare,
	SiCplusplus,
	SiDocker,
	SiHaskell,
	SiJavascript,
	SiNextdotjs,
	SiNodedotjs,
	SiNumpy,
	SiPandas,
	SiPython,
	SiPytorch,
	SiRust,
	SiScikitlearn,
	SiTailwindcss,
	SiTypescript,
} from "react-icons/si";
import { IconGroup } from "@/components/about/IconGroup";
import { ContactButton } from "@/components/about/ContactButton";

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
				/>
			</picture>

			<Profile />
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
				<Repos />
			</Section>
			<Section
				title="Technologies & Frameworks"
				className="gap-y-5 font-semibold"
			>
				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<IconGroup title="Web">
						<FaReact size={24} title="React" />
						<SiJavascript size={24} title="JavaScript" />
						<SiTypescript size={24} title="TypeScript" />
						<SiNextdotjs size={24} title="Next.js" />
						<SiAstro size={24} title="Astro" />
						<SiTailwindcss size={24} title="TailwindCSS" />
					</IconGroup>

					<IconGroup title="General-Purpose">
						<SiRust size={24} title="Rust" />
						<SiC size={24} title="C" />
						<SiCplusplus size={24} title="C++" />
						<FaJava size={24} title="Java" />
						<FaSwift size={24} title="Swift" />
						<SiNodedotjs size={24} title="Node.js" />
						<SiHaskell size={24} title="Haskell" />
						<SiPython size={24} title="Python" />
					</IconGroup>

					<IconGroup title="Machine Learning &amp; Data Analytics">
						<SiPytorch size={24} title="PyTorch" />
						<SiNumpy size={24} title="NumPy" />
						<SiScikitlearn size={24} title="scikit-learn" />
						<SiPandas size={24} title="pandas" />
					</IconGroup>

					<IconGroup title="Deployment">
						<SiDocker size={24} title="Docker" />
						<SiAmazons3 size={24} title="Amazon S3" />
						<SiCloudflare size={24} title="Cloudflare" />
						<SiAwslambda size={24} title="AWS Lambda" />
					</IconGroup>
				</div>
			</Section>
		</div>
	);
}
