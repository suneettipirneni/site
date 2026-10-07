import { ViewTransition, type PropsWithChildren } from "react";

export default function BlogLayout({ children }: PropsWithChildren) {
	return (
		<ViewTransition default="blog-page">
			<div
				className="w-full min-w-0"
				style={{ viewTransitionClass: "blog-page" }}
			>
				{children}
			</div>
		</ViewTransition>
	);
}
