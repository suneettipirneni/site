export function TagChip({ name }: { name: string }) {
  return (
    <div className="rounded-full bg-black/10 dark:bg-white/30 dark:text-white text-black/50 px-3 py-1 text-sm font-bold">
      {name}
    </div>
  );
}
