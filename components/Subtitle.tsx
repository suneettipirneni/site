export function Subtitle({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h1 className={`${className} text-left text-lg sm:text-2xl`}>{children}</h1>
	);
}
