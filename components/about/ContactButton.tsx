import { type ReactNode } from "react";

export interface ContactButtonProps {
	/**
	 * The title of the contact button.
	 */
	title: string;

	/**
	 * The URL to open when the contact button is clicked.
	 */
	url: string;

	/**
	 * The icon to display in the contact button.
	 */
	icon: ReactNode;
}

export function ContactButton({ title, url, icon }: ContactButtonProps) {
	return (
		<a
			href={url}
			title={title}
			className="flex flex-row items-center gap-x-2 rounded-xl bg-gray-200/60 p-2 font-semibold dark:bg-white/10"
			target="_blank"
			rel="noopener noreferrer"
		>
			{icon}
		</a>
	);
}
