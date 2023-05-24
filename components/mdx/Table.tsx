import { HtmlHTMLAttributes } from "react";

export function Table(props: HtmlHTMLAttributes<HTMLTableElement>) {
  return (
    <table
      className="rounded-lg dark:bg-gray-800 bg-white/30 border border-gray-300 dark:border-gray-600"
      {...props}
    />
  );
}

export function TableRow(props: HtmlHTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props} />;
}

export function TableCell(props: HtmlHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className="p-2 border border-gray-300 dark:border-gray-600"
      {...props}
    />
  );
}
