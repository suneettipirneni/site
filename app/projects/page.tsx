import { Title } from "@/components/Title";

function ProjectCard() {
	return (
		<div className="flex flex-col space-y-2 rounded-lg border border-gray-200 p-5">
			<Title className="line-clamp-3 max-w-[600px] text-left">
				{"Hello! I'm Suneet and this is a website"}
			</Title>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</p>
		</div>
	);
}

export default function ProjectsPage() {
	return (
		<div className="mx-auto grid max-w-[1000px] grid-cols-2 gap-5">
			<ProjectCard />
			<ProjectCard />
			<ProjectCard />
			<ProjectCard />
		</div>
	);
}
