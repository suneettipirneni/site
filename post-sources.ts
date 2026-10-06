const modules = import.meta.glob<{ default: string }>("./posts/*.mdx", {
	eager: true,
	query: "?raw",
});

export const postSources = Object.fromEntries(
	Object.entries(modules).map(([path, source]) => [path, source.default]),
);
