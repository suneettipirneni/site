import { HtmlHTMLAttributes } from "react";

export function Paragraph(props: HtmlHTMLAttributes<HTMLParagraphElement>) {
  return <p className="mb-4 leading-[1.75]" {...props} />;
}
