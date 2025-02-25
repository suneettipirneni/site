import { HtmlHTMLAttributes } from "react";

export function Paragraph(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
	return <p className="post:my-5 post:leading-[1.75]" {...props} />;
}
