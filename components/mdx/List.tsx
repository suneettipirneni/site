import { HtmlHTMLAttributes } from "react";

export function List({
	ordered,
	...props
}: HtmlHTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
	return (
		<ul
			style={{ fontSize: 16 }}
			className={`space-y-2 pl-3 marker:text-black/70 dark:marker:text-white/50 ${
				ordered ? "list-decimal" : "list-disc"
			} list-inside post:mb-4`}
			{...props}
		/>
	);
}
