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
		<time className={`type-caption text-muted-foreground ${className}`}>
			{formatDatetime(datetime)} <span aria-hidden="true">·</span> {timeToRead}{" "}
			min read
		</time>
	);
}
