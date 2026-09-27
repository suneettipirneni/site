import type { ReactNode } from "react";
import {
	HiChevronDown,
	HiOutlineExclamationTriangle,
	HiOutlineInformationCircle,
	HiOutlineXCircle,
} from "react-icons/hi2";

export interface InfoBlockProps {
	title: string;
	kind?: "info" | "warning" | "danger";
	children?: ReactNode;
}
const kinds = {
	info: { icon: HiOutlineInformationCircle, label: "Note" },
	warning: { icon: HiOutlineExclamationTriangle, label: "Warning" },
	danger: { icon: HiOutlineXCircle, label: "Caution" },
};
export function InfoBlock({ title, kind = "info", children }: InfoBlockProps) {
	const { icon: Icon, label } = kinds[kind];
	return (
		<details className="mdx-callout">
			<summary data-not-typeset className="mdx-callout-summary">
				<Icon aria-hidden="true" className="mdx-callout-icon" />
				<span className="mdx-callout-heading">
					<span className="mdx-callout-kind">{label}.</span>{" "}
					<span className="mdx-callout-title">{title}</span>
				</span>
				<HiChevronDown aria-hidden="true" className="mdx-callout-chevron" />
			</summary>
			<div className="mdx-callout-body">{children}</div>
		</details>
	);
}
