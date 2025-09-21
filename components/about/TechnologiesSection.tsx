import { Section } from "@/components/about/Section";
import {
	FaJava,
	FaReact,
	FaSwift,
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
} from "@/lib/icons";
import { IconGroup } from "@/components/about/IconGroup";

export function TechnologiesSection() {
	return (
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
	);
}