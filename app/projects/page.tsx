import { Title } from "@/components/Title";
import Image from "next/image";
import { type Project, allProjects } from "contentlayer/generated";
import Link from "next/link";

function ProjectCard({ project }: { project: Project }) {
	return (
		<Link
			href={project.url}
			className="relative flex h-[250px] flex-col items-center justify-end space-y-2 overflow-clip rounded-2xl bg-black p-5"
		>
			<Image
				src={project.headingImage}
				alt=""
				width={400}
				height={400}
				className="absolute inset-0 mx-auto h-[80%] w-[70%] object-cover [mask-image:linear-gradient(rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,1),rgba(0,0,0,0.8),rgba(0,0,0,0.7),rgba(0,0,0,0.6),rgba(0,0,0,0.5),rgba(0,0,0,0.1));]"
			/>
			<div className="z-10 flex-col space-y-2">
				<Title className="line-clamp-3 max-w-[600px] text-left font-mono text-white">
					{project.title}
				</Title>
				<p className="text-white/80">{project.description}</p>
			</div>
		</Link>
	);
}

export default function ProjectsPage() {
	return (
		<div className="mx-auto grid w-full max-w-postcontent grid-cols-1 gap-4 md:grid-cols-2">
			{allProjects.map((project) => (
				<ProjectCard key={project.slug} project={project} />
			))}
		</div>
	);
}
