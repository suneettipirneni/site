export function Tag({ name }: { name: string }) {
	return (
		<div className="line-clamp-1 rounded-full bg-black/5 px-2 py-1 text-xs font-semibold text-black/70 dark:bg-white/10 dark:text-white">
			{name}
		</div>
	);
}

export function Tags({ tags }: { tags: string[] }) {
	return (
		<div className="flex flex-row flex-wrap items-end gap-2">
			{tags.map((tag) => (
				<Tag key={tag} name={tag} />
			))}
		</div>
	);
}
