import Link from "next/link";

export function Tag({
	name,
	compact = false,
}: {
	name: string;
	compact?: boolean;
}) {
	const params = new URLSearchParams({ tags: name }).toString();

	return (
		<Link
			href={`/blog?${params}`}
			scroll={false}
			className={`line-clamp-1 rounded-full bg-black/5 ${
				compact ? "px-2 py-0.5" : "px-2 py-1"
			}  text-xs font-semibold text-black/70 dark:bg-white/10 dark:text-white`}
		>
			{name}
		</Link>
	);
}

export function Tags({
	tags,
	compact = false,
}: {
	tags: string[];
	compact?: boolean;
}) {
	return (
		<div className="flex grow flex-row flex-wrap items-end gap-2">
			{tags.map((tag) => (
				<Tag compact={compact} key={tag} name={tag} />
			))}
		</div>
	);
}
