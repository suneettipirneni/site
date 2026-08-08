export const postSources = import.meta.glob("./posts/*.mdx", {
	eager: true,
	import: "default",
	query: "?raw",
}) as Record<string, string>;
