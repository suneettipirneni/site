import Link from "next/link";
import { getPostTagTransitionStyle } from "@/lib/blog-transition";

interface TagProps {
	name: string;
	variant?: "inline" | "row";
	transitionSlug?: string;
}

export function Tag({ name, variant = "inline", transitionSlug }: TagProps) {
	const params = new URLSearchParams({ tags: name }).toString();

	return (
		<Link
			href={`/blog?${params}`}
			scroll={false}
			style={
				transitionSlug
					? getPostTagTransitionStyle(transitionSlug, name)
					: undefined
			}
			className={`type-caption text-muted-foreground underline-offset-4 hover:text-foreground hover:underline ${
				variant === "row"
					? "flex min-h-[var(--site-row-sm)] w-full items-center px-[var(--space-cell)]"
					: "post-tag inline-flex items-center"
			}`}
		>
			{name}
		</Link>
	);
}

export function Tags({
	tags,
	variant = "inline",
	transitionSlug,
}: {
	tags: string[];
	variant?: "inline" | "row";
	transitionSlug?: string;
}) {
	return (
		<div
			className={
				variant === "row"
					? "flex w-full flex-col"
					: "post-tags flex flex-wrap items-center gap-x-4 gap-y-2"
			}
		>
			{tags.map((tag) => (
				<Tag
					key={tag}
					name={tag}
					variant={variant}
					transitionSlug={transitionSlug}
				/>
			))}
		</div>
	);
}
