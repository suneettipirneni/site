import type { ComponentProps, ReactNode } from "react";

export interface QuoteProps extends ComponentProps<"figure"> {
	/** The person or source credited for the quote. */
	attribution: ReactNode;
	/** A URL identifying the quote's source. */
	cite?: ComponentProps<"blockquote">["cite"];
}

export function Quote({
	attribution,
	cite,
	children,
	className,
	...props
}: QuoteProps) {
	return (
		<figure
			data-not-typeset
			className={`mdx-quote ${className ?? ""}`}
			{...props}
		>
			<div className="mdx-quote-content">
				<span aria-hidden="true" className="mdx-quote-mark">
					&ldquo;
				</span>

				<div>
					<blockquote cite={cite} className="mdx-quote-text">
						{children}
					</blockquote>

					<figcaption className="mdx-quote-attribution">
						<span aria-hidden="true">&mdash;</span>
						<span>{attribution}</span>
					</figcaption>
				</div>
			</div>
		</figure>
	);
}
