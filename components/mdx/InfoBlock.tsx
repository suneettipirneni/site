"use client";

import { useCallback, useState } from "react";
import {
	HiChevronDown,
	HiExclamationTriangle,
	HiInformationCircle,
	HiXCircle,
} from "react-icons/hi2";

export interface InfoBlockProps {
	title: string;
	kind?: "info" | "warning" | "danger";
	children?: React.ReactNode;
}

const mappedIcons = {
	info: HiInformationCircle,
	warning: HiExclamationTriangle,
	danger: HiXCircle,
};

export function InfoBlock({ title, kind = "info", children }: InfoBlockProps) {
	const [open, setOpen] = useState(false);
	const Icon = mappedIcons[kind];

	const toggleOpen = useCallback(() => {
		setOpen((prevOpen) => !prevOpen);
	}, []);

	return (
		<div data-not-typeset className="post:-mx-[var(--space-page)] post:mb-5">
			<button
				type="button"
				aria-expanded={open}
				className="type-label flex h-[var(--site-control)] w-full items-center justify-between gap-3 px-[var(--space-cell)] text-left hover:bg-muted"
				onClick={toggleOpen}
			>
				<span className="flex items-center gap-2">
					<Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
					{title}
				</span>
				<HiChevronDown
					className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
						open ? "rotate-180" : ""
					}`}
					aria-hidden="true"
				/>
			</button>

			{open ? (
				<div className="flex flex-col gap-y-4 p-[var(--space-cell)]">
					{children}
				</div>
			) : null}
		</div>
	);
}
