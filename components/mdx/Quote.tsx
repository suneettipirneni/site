export interface QuoteProps {
	children?: React.ReactNode;
	source?: string;
}

export function Quote({ children, source }: QuoteProps) {
	return (
		<div className="flex items-center px-5  align-middle text-lg font-medium leading-snug post:my-10 md:px-10 md:text-xl">
			<div className="flex max-w-[45ch] flex-col space-y-4 border-l-4 border-black py-3 pl-4 dark:border-white">
				{children}
			</div>
		</div>
	);
}
