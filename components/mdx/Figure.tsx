import { PropsWithChildren } from "react";

/**
 * Props for the Figure component.
 */
export interface FigureProps extends PropsWithChildren {
	/**
	 * The caption for the figure.
	 */
	caption: string;
}

export function Figure({ caption, children }: FigureProps) {
	return (
		<figure
			data-not-typeset
			className="flex flex-col post:-mx-[var(--space-page)] post:mb-4"
		>
			{children}
			<figcaption className="type-caption flex h-[var(--site-control)] w-full items-center gap-2 px-[var(--space-cell)] text-left text-muted-foreground">
				<span className="font-medium text-foreground">Figure</span>
				<span aria-hidden="true">—</span>
				{caption}
			</figcaption>
		</figure>
	);
}
