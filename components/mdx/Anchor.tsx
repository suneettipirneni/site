import { HTMLAttributes } from "react";
import { FiArrowUpRight } from "react-icons/fi";

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
