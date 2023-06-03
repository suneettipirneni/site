export function TagChip({ name }: { name: string }) {
  return (
    <div className="rounded-full bg-gray-300/40 dark:bg-white/30 dark:text-white text-black/70 px-2 py-1 text-xs font-medium line-clamp-1">
      {name}
    </div>
  );
}
