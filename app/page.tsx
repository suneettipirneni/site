import { Profile } from "@/components/Profile";
import profileBg from "../public/profile-bg.webp";
import profileBgDark from "../public/profile-bg-dark.webp";
import Image from "next/image";
import { Repos } from "@/components/Repos";
import { FaJava, FaReact, FaSwift } from "react-icons/fa";
import {
	SiAmazons3,
	SiAstro,
	SiAwslambda,
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

function TechSection({
	children,
	title,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-y-2">
			<h2 className="text-sm font-medium text-gray-600 dark:text-white">
				{title}
			</h2>
			<div className="flex flex-row flex-wrap gap-2 text-gray-700 dark:text-white/50">
				{children}
			</div>
		</div>
	);
}

export default function Home() {
	return (
		<div className="flex grow flex-col items-center justify-center space-y-10 overflow-hidden bg-fixed bg-center px-5 pb-10 md:space-y-10 md:px-0">
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
			<div className="flex w-full max-w-[600px] flex-col gap-y-3">
				<h1 className="m-0 flex w-full max-w-[600px] items-center gap-x-3 font-semibold">
					About Me
					<div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
				</h1>
				<span className="w-full max-w-[600px] text-gray-600 dark:text-gray-400">
					{
						"I'm a student and avid open source developer currently pursuing a master's degree in computer vision. I'm passionate about building tools that are accessible and useful to others."
					}
				</span>
			</div>

			<div className="flex w-full max-w-[600px] flex-col gap-y-3">
				<h1 className="m-0 flex w-full max-w-[600px] items-center gap-x-3 font-semibold">
					Open Source Projects
					<div className="h-[2px] grow rounded-full bg-black/20 dark:bg-white/20" />
				</h1>
				<Repos />
			</div>
			<div className="flex w-full max-w-[600px] flex-col gap-y-5 font-semibold">
				<h1 className="m-0 flex w-full max-w-[600px] items-center gap-x-3 font-semibold">
					Technology &amp; Frameworks
					<div className="h-[2px] grow bg-black/20 dark:bg-white/20" />
				</h1>

				<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
					<TechSection title="Web">
						<FaReact size={24} title="React" />
						<SiJavascript size={24} title="JavaScript" />
						<SiTypescript size={24} title="TypeScript" />
						<SiNextdotjs size={24} title="Next.js" />
						<SiAstro size={24} title="Astro" />
						<SiTailwindcss size={24} title="TailwindCSS" />
					</TechSection>

					<TechSection title="General-Purpose">
						<SiRust size={24} title="Rust" />
						<SiC size={24} title="C" />
						<SiCplusplus size={24} title="C++" />
						<FaJava size={24} title="Java" />
						<FaSwift size={24} title="Swift" />
						<SiNodedotjs size={24} title="Node.js" />
						<SiHaskell size={24} title="Haskell" />
						<SiPython size={24} title="Python" />
					</TechSection>

					<TechSection title="Machine Learning &amp; Data Analytics">
						<SiPytorch size={24} title="PyTorch" />
						<SiNumpy size={24} title="NumPy" />
						<SiScikitlearn size={24} title="scikit-learn" />
						<SiPandas size={24} title="pandas" />
					</TechSection>

					<TechSection title="Deployment">
						<SiDocker size={24} title="Docker" />
						<SiAmazons3 size={24} title="Amazon S3" />
						<SiCloudflare size={24} title="Cloudflare" />
						<SiAwslambda size={24} title="AWS Lambda" />
					</TechSection>
				</div>
			</div>
		</div>
	);
}
