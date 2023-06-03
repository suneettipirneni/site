import { HtmlHTMLAttributes } from "react";

export function BlockQuote(props: HtmlHTMLAttributes<HTMLElement>) {
	return (
		<blockquote
			className="border-l-4 border-gray-300 pl-4 font-medium text-gray-600 post:mb-4 dark:border-white/25 dark:text-white/75"
			{...props}
		/>
	);
}
