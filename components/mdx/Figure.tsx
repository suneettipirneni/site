import { PropsWithChildren } from "react";

export interface FigureProps extends PropsWithChildren {
	caption: string;
}

export function Figure({ caption, children }: FigureProps) {
	return (
		<div className="flex flex-col items-center justify-center gap-y-3 post:mb-4">
			{children}
			<figcaption className="w-full grow text-center text-sm font-medium">
				{caption}
			</figcaption>
		</div>
	);
}
