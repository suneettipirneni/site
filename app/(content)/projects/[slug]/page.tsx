import { Outline } from "@/components/Outline";
import { mdxComponents } from "@/components/mdx/components";
import { serializeHeadings } from "@/util/HeaderTree";
import { formatDatetime } from "@/util/formatDate";
import { allProjects } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

const findProject = (slug: string) => {
	const project = allProjects.find((project) => project.slug === slug);
	if (!project) throw new Error(`Project not found for slug: ${slug}`);
	return project;
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
	const post = findProject(params.slug);
	const headings = serializeHeadings(post.headings);
	const MDXComponent = useMDXComponent(post.body.code);

	return (
		<article className="relative z-10 mx-auto grid w-full items-start justify-center px-4 py-4 align-middle md:px-0 xl:grid-cols-postgrid xl:gap-x-10">
			<Link
				href="/projects"
				className="col-start-2 row-start-1 mb-5 flex flex-row items-center gap-2 text-xl font-medium"
			>
				<FaArrowLeft />
				Back
			</Link>
			<h1 className="col-start-2 row-start-2 mb-10 flex w-auto max-w-postcontent flex-col font-mono text-3xl font-bold">
				{post.title}
				<time
					dateTime={post.datetime}
					className="text-sm font-normal text-gray-600 dark:text-gray-300"
				>
					{formatDatetime(post.datetime)}
				</time>
			</h1>
			<div className="col-start-2 row-start-3 mb-2 min-w-0 max-w-postcontent self-start">
				<div className="space-y-5">
					<p className="text-gray-600 dark:text-gray-300">{post.description}</p>
				</div>
				<div data-post className="col-start-2 min-w-0 max-w-postcontent">
					<MDXComponent components={mdxComponents} />
				</div>
			</div>

			<Outline
				className="sticky top-nav col-start-3 row-start-3 hidden min-w-[200px] flex-1 self-start overflow-y-auto border-gray-500 pt-8 xl:block"
				headings={headings}
			/>
		</article>
	);
}
