import { Separator } from "@/components/Separator";
import Image from "next/image";
import { PropsWithChildren } from "react";

interface WorkItemProps extends PropsWithChildren {
	title: string;
	company: string;
	date: string;
	imageUrl?: string;
}

function WorkItem({ title, company, date, children }: WorkItemProps) {
	return (
		<div className="flex w-full flex-col gap-y-2">
			<div className="mb-2 flex items-center gap-x-3 overflow-clip rounded-md">
				<Image
					className="bg-red rounded-lg"
					src="/me.jpg"
					alt="Picture of the author"
					width={50}
					height={50}
				/>
				<div className="flex flex-col items-start">
					<h1 className="text-2xl font-bold">{company}</h1>
					<div className="flex items-center gap-2 text-sm">
						<h1 className="text-gray-500 dark:text-gray-400">{title}</h1>
						<div className="rounded-full bg-gray-300/50 px-2 py-1 text-xs font-semibold">
							{date}
						</div>
					</div>
				</div>
			</div>

			<div className="flex items-center gap-x-3"></div>
			<Separator />
			<div className="w-full text-gray-700 dark:text-gray-300">{children}</div>
		</div>
	);
}

export default function WorkPage() {
	return (
		<div className="flex w-full max-w-[700px] flex-col gap-20">
			<WorkItem
				title="Software Engineer"
				company="Company"
				date="2023 — Present"
			>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna aliqua. Id neque
					aliquam vestibulum morbi blandit cursus. Odio tempor orci dapibus
					ultrices. Mauris ultrices eros in cursus turpis massa tincidunt dui.
					Nulla pellentesque dignissim enim sit amet venenatis urna cursus.
					Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Mattis
					molestie a iaculis at erat. Gravida dictum fusce ut placerat orci
					nulla pellentesque dignissim enim. Accumsan tortor posuere ac ut.
					Dignissim convallis aenean et tortor at risus viverra adipiscing. At
					lectus urna duis convallis convallis tellus id. Vestibulum lectus
					mauris ultrices eros in cursus turpis massa. Curabitur gravida arcu ac
					tortor. Est ante in nibh mauris cursus mattis molestie. Est velit
					egestas dui id ornare arcu odio. Nulla pharetra diam sit amet nisl
					suscipit adipiscing.
				</p>
			</WorkItem>
		</div>
	);
}
