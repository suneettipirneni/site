import type { ReactNode } from "react";
import {
	HiChevronDown,
	HiExclamationTriangle,
	HiInformationCircle,
	HiXCircle,
} from "react-icons/hi2";

export interface InfoBlockProps {
	title: string;
	kind?: "info" | "warning" | "danger";
	children?: ReactNode;
}
const kinds = {
	info: { icon: HiInformationCircle, label: "Note" },
	warning: { icon: HiExclamationTriangle, label: "Warning" },
	danger: { icon: HiXCircle, label: "Caution" },
};
export function InfoBlock({ title, kind = "info", children }: InfoBlockProps) {
	const { icon: Icon, label } = kinds[kind];
	return (
		<details className="mdx-callout">
			<summary data-not-typeset className="mdx-callout-summary">
				<Icon aria-hidden="true" className="mdx-callout-icon" />
				<span className="mdx-callout-heading">
					<span className="mdx-callout-kind">{label}</span>
					<span className="mdx-callout-title">{title}</span>
				</span>
				<HiChevronDown
					aria-hidden="true"
					className="mdx-callout-chevron size-4 shrink-0"
				/>
			</summary>
			<div className="mdx-callout-body">{children}</div>
		</details>
	);
}
