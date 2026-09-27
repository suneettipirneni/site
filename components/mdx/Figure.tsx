import type { PropsWithChildren } from "react";

export interface FigureProps extends PropsWithChildren {
	caption: string;
}

export function Figure({ caption, children }: FigureProps) {
	return (
		<figure className="mdx-figure">
			<div className="mdx-figure-content">{children}</div>
			<figcaption data-not-typeset className="mdx-caption">
				{caption}
			</figcaption>
		</figure>
	);
}
