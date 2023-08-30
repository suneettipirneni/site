import { HTMLAttributes } from "react";

export function Anchor({
	children,
	...props
}: HTMLAttributes<HTMLAnchorElement>) {
	return (
		<a className="text-blue-600 hover:underline" {...props}>
			{children}
			{/* <FiArrowUpRight /> */}
		</a>
	);
}
