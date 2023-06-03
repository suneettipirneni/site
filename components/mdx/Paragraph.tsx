import { HtmlHTMLAttributes } from "react";

export function Paragraph(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
	return <p className="leading-[1.75] post:mb-4" {...props} />;
}
