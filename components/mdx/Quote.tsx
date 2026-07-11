export interface QuoteProps {
	children?: React.ReactNode;
	source?: string;
}

export function Quote({ children, source }: QuoteProps) {
	return (
		<blockquote>
			{children}
			{source ? <cite>{source}</cite> : null}
		</blockquote>
	);
}
