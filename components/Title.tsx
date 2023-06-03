export function Title({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<h1 className={`${className} text-left text-2xl font-bold lg:text-3xl`}>
			{children}
		</h1>
	);
}
