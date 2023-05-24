import { HtmlHTMLAttributes } from "react";

export function List(props: HtmlHTMLAttributes<HTMLUListElement>) {
  return <ul className="list-disc list-inside" {...props} />;
}
