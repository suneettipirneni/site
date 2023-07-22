export interface FilterBarProps {
	className?: string;
	tags: string[];
}

export function FilterBar({ tags, className = "" }: FilterBarProps) {
	return (
		<div className={`flex flex-wrap gap-x-2 ${className}`}>
			{tags.map((tag) => (
				<div
					key={tag}
					className="flex items-center rounded-full bg-gray-200/75 px-3 py-1 text-sm font-semibold"
				>
					{tag}
				</div>
			))}
		</div>
	);
}
