import { HTMLAttributes, HtmlHTMLAttributes } from "react";

export function Table(props: HtmlHTMLAttributes<HTMLTableElement>) {
	return <table {...props} />;
}

export function TableHeader(props: HTMLAttributes<HTMLTableSectionElement>) {
	return <thead {...props} />;
}

export function TableHeadingCell(
	props: HtmlHTMLAttributes<HTMLTableCellElement>
) {
	return <th {...props} />;
}

export function TableBody(props: HTMLAttributes<HTMLTableSectionElement>) {
	return <tbody {...props} />;
}

export function TableRow(props: HtmlHTMLAttributes<HTMLTableRowElement>) {
	return <tr {...props} />;
}

export function TableCell(props: HtmlHTMLAttributes<HTMLTableCellElement>) {
	return <td {...props} />;
}
