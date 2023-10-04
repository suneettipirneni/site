import { PropsWithChildren } from "react";

export interface IconGroupProps extends PropsWithChildren {
	/**
	 * The title of the icon group.
	 */
	title: string;
}

export function IconGroup({ children, title }: IconGroupProps) {
	return (
		<div className="flex flex-col flex-wrap gap-y-2">
			<h2 className="text-sm font-medium text-gray-600 dark:text-white">
				{title}
			</h2>
			<div className="flex flex-row flex-wrap gap-2 text-gray-700 dark:text-white/50">
				{children}
			</div>
		</div>
	);
}
