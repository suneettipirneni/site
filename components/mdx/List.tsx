import { HtmlHTMLAttributes } from "react";

export function List({
  ordered,
  ...props
}: HtmlHTMLAttributes<HTMLUListElement> & { ordered?: boolean }) {
  return (
    <ul
      className={`pl-5 space-y-2 ${
        ordered ? "list-decimal" : "list-disc"
      } list-inside post:mb-4`}
      {...props}
    />
  );
}
