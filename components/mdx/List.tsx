import { HtmlHTMLAttributes } from "react";

export function List({
	ordered,
	...props
}: HtmlHTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
	return (
		<ul
			className={`space-y-2 pl-5 marker:text-black/50 dark:marker:text-white/50 ${
				ordered ? "list-decimal" : "list-"
			} list-inside post:mb-4`}
			{...props}
		/>
	);
}
