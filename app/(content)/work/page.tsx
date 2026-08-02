import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";

export default function WorkPage() {
	return (
		<div className="site-content-grid min-h-[calc(100dvh-var(--site-nav))] w-full">
			<aside className="p-[var(--site-panel)]">
				<StaggeredEntrance className="flex flex-col gap-5">
					<EntranceItem>
						<h1 className="type-page-title">Work</h1>
					</EntranceItem>
					<EntranceItem>
						<h2 className="type-label">Current</h2>
						<dl className="mt-3 text-[0.8125rem] leading-5">
							<div className="grid min-h-[var(--site-row-sm)] grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 py-2">
								<dt className="font-medium">Role</dt>
								<dd className="text-muted-foreground">Software Engineer</dd>
							</div>
							<div className="grid min-h-[var(--site-row-sm)] grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 py-2">
								<dt className="font-medium">Company</dt>
								<dd className="text-muted-foreground">Company</dd>
							</div>
							<div className="grid min-h-[var(--site-row-sm)] grid-cols-[6rem_minmax(0,1fr)] items-center gap-4 py-2">
								<dt className="font-medium">Dates</dt>
								<dd className="text-muted-foreground">2023 — Present</dd>
							</div>
						</dl>
					</EntranceItem>
				</StaggeredEntrance>
			</aside>

			<StaggeredEntrance className="p-[var(--site-panel)]">
				<EntranceItem>
					<h2 className="type-section-title">Selected experience</h2>
				</EntranceItem>
				<EntranceItem className="mt-4">
					<div className="type-body max-w-[76ch] text-muted-foreground">
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Id
							neque aliquam vestibulum morbi blandit cursus. Odio tempor orci
							dapibus ultrices. Mauris ultrices eros in cursus turpis massa
							tincidunt dui. Nulla pellentesque dignissim enim sit amet
							venenatis urna cursus. Cursus euismod quis viverra nibh cras
							pulvinar mattis nunc. Mattis molestie a iaculis at erat.
						</p>
					</div>
				</EntranceItem>
			</StaggeredEntrance>
		</div>
	);
}
