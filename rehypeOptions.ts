import type { Options } from "rehype-pretty-code";

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: "dark-plus",
    light: "light-plus",
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("line--highlighted");
  },
};
