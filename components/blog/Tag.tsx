import Link from "next/link";

interface TagProps {
	name: string;
	variant?: "inline" | "row";
}

export function Tag({ name, variant = "inline" }: TagProps) {
	const params = new URLSearchParams({ tags: name }).toString();

	return (
		<Link
			href={`/blog?${params}`}
			transitionTypes={["page-crossfade"]}
			scroll={false}
			className={`type-caption text-muted-foreground underline-offset-4 hover:text-foreground hover:underline ${
				variant === "row"
					? "flex min-h-[var(--site-row-sm)] w-full items-center px-[var(--space-cell)]"
					: "inline-flex items-center"
			}`}
		>
			{name}
		</Link>
	);
}

export function Tags({
	tags,
	variant = "inline",
}: {
	tags: string[];
	variant?: "inline" | "row";
}) {
	return (
		<div
			className={
				variant === "row"
					? "flex w-full flex-col"
					: "flex flex-wrap items-center gap-x-4 gap-y-1"
			}
		>
			{tags.map((tag) => (
				<Tag key={tag} name={tag} variant={variant} />
			))}
		</div>
	);
}
