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
		<span
			className={`post-datetime type-caption text-muted-foreground ${className}`}
		>
			<time dateTime={datetime.toISOString()}>{formatDatetime(datetime)}</time>
			<span className="post-duration">
				<span aria-hidden="true">·</span> {timeToRead} min read
			</span>
		</span>
	);
}
