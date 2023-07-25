export function Separator({ className = "", height = 1 }) {
	return (
		<div
			style={{ height: `${height}px` }}
			className={`flex w-full items-center justify-center bg-gray-200 align-middle dark:bg-gray-200/50 ${className}`}
		/>
	);
}
