import { formatDatetime } from "@/lib/formatDate";
import { getPostTransitionStyle } from "@/lib/blog-transition";

export interface DateTimeProps {
	datetime: Date;
	timeToRead: number;
	className?: string;
	transitionSlug?: string;
}

export function DateTime({
	datetime,
	timeToRead,
	className = "",
	transitionSlug,
}: DateTimeProps) {
	return (
		<span
			className={`post-datetime type-caption text-muted-foreground ${className}`}
		>
			<time
				dateTime={datetime.toISOString()}
				style={
					transitionSlug
						? getPostTransitionStyle(transitionSlug, "date")
						: undefined
				}
			>
				{formatDatetime(datetime)}
			</time>
			<span
				className="post-duration"
				style={
					transitionSlug
						? getPostTransitionStyle(transitionSlug, "read-time")
						: undefined
				}
			>
				<span aria-hidden="true">·</span> {timeToRead} min read
			</span>
		</span>
	);
}
