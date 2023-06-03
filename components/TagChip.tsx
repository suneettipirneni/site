export function TagChip({ name }: { name: string }) {
	return (
		<div className="line-clamp-1 rounded-full bg-gray-300/40 px-2 py-1 text-xs font-medium text-black/70 dark:bg-white/30 dark:text-white">
			{name}
		</div>
	);
}
