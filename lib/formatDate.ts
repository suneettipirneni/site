const formatOptions: Intl.DateTimeFormatOptions = {
	year: "numeric",
	month: "short",
	day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", formatOptions);

export const formatDatetime = (date: Date) => formatter.format(date);
