export interface HeaderProps {
	/**
	 * The title of the header.
	 */
	title: string;
}

export function Header({ title }: HeaderProps) {
	return (
		<h1 className="m-0 flex w-full max-w-[600px] items-center gap-x-3 font-semibold">
			{title}
			<div className="h-[2px] grow bg-black/10 dark:bg-white/20" />
		</h1>
	);
}
