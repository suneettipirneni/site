import { HTMLAttributes, HtmlHTMLAttributes } from "react";

export function Table(props: HtmlHTMLAttributes<HTMLTableElement>) {
	return (
		<div className="overflow-clip rounded-lg border border-gray-300 bg-white/30 post:mb-4 dark:border-white/25 dark:bg-white/10">
			<table
				className=" divide-y divide-gray-300 dark:divide-white/25"
				{...props}
			/>
		</div>
	);
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
	return <thead className="bg-gray-100 dark:bg-white/10" {...props} />;
}

export function TableHeadingCell(
	props: HtmlHTMLAttributes<HTMLTableCellElement>
) {
	return <th className="px-4 py-2 font-bold" {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
	return (
		<tbody
			className="divide-y divide-gray-300 dark:divide-white/25"
			{...props}
		/>
	);
}

export function TableRow(props: HtmlHTMLAttributes<HTMLTableRowElement>) {
	return (
		<tr className="divide-x divide-gray-300 dark:divide-white/25" {...props} />
	);
}

export function TableCell(props: HtmlHTMLAttributes<HTMLTableCellElement>) {
	return <td className="px-4 py-2" {...props} />;
}
