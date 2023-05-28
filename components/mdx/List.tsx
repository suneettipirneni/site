import { HtmlHTMLAttributes } from "react";

export function List({
  ordered,
  ...props
}: HtmlHTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
  return (
    <ul
      className={`${ordered ? "list-decimal" : "list-disc"} list-inside`}
      {...props}
    />
  );
}
