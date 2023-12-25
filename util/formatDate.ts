const formatOptions: Intl.DateTimeFormatOptions = {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", formatOptions);

export const formatDatetime = (date: string) =>
	formatter.format(new Date(date));
