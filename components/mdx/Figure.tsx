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
		<div className="flex flex-col items-center justify-center gap-y-3 post:mb-4">
			{children}
			<figcaption className="w-full grow text-center text-sm">
				{caption}
			</figcaption>
		</div>
	);
}
