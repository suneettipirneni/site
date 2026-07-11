import { HtmlHTMLAttributes } from "react";

export function List({
	ordered,
	...props
}: HtmlHTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
	const Component = ordered ? "ol" : "ul";

	return <Component {...props} />;
}
