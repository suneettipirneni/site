import { formatDatetime } from "@/lib/formatDate";

export interface DateTimeProps {
	datetime: Date;
	timeToRead: number;
	className?: string;
}

export function DateTime({
	datetime,
	timeToRead,
	className = "",
}: DateTimeProps) {
	return (
		<time
			className={`text-sm font-medium text-gray-600 dark:text-gray-300/80 ${className}`}
		>
			{formatDatetime(datetime)} · {timeToRead}
			min
		</time>
	);
}
