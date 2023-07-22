import { HtmlHTMLAttributes } from "react";

export function Paragraph(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
	return (
		<p
			className="text-sm post:mb-4 post:leading-[1.75] md:text-base"
			{...props}
		/>
	);
}
