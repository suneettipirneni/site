export interface SeparatorProps {
  className?: string;
}

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      className={`h-[1px] border-b border-gray border-gray-500/30 dark:border-gray-600 ${className}`}
    />
  );
}
