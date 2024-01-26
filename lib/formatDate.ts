const formatOptions: Intl.DateTimeFormatOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", formatOptions);

export const formatDatetime = (date: Date) => formatter.format(date);
