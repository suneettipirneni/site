import type { Post } from "contentlayer/generated";
import { format, parseISO } from "date-fns";

export interface DateTimeProps {
	datetime: string;
	timeToRead: number;
}

export function DateTime({ datetime, timeToRead }: DateTimeProps) {
	return (
		<time className="text-sm font-medium text-gray-600 dark:text-gray-300/80">
			{format(parseISO(datetime), "LLLL d, yyyy")} · {timeToRead}
			min
		</time>
	);
}
