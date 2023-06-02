import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Element } from "hast";
import type { Node } from "unist-util-visit/lib";

const languageMap: Record<string, string> = {
  cpp: "c++",
  "c#": "C-Sharp",
  rs: "Rust",
  py: "Python",
  js: "JavaScript",
  javascript: "JavaScript",
  ts: "TypeScript",
  typescript: "TypeScript",
  tsx: "TSX",
  jsx: "JSX",
  html: "HTML",
  css: "CSS",
};

function transformLanguage(language: string) {
  const titleCase = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (language in languageMap) {
    return titleCase(languageMap[language]);
  }

  return titleCase(language);
}

export const codeTitleBarPlugin: Plugin = () => {
  const codeTitleBarPredicate = (node: Node) => {
    if (node.type !== "element") {
      return false;
    }

    const element = node as Element;

    // console.log(element?.properties?.["data-pretty-code-fragment"]);

    return Boolean(
      element.tagName === "div" &&
        "data-rehype-pretty-code-fragment" in element.properties!
    );
  };

  return (tree) => {
    visit(tree, codeTitleBarPredicate, (node: Node) => {
      const element = node as Element;

      const codeTitleBar = element.children.find(
        (node) =>
          node.type === "element" &&
          node.tagName === "div" &&
          "data-rehype-pretty-code-title" in node.properties!
      ) as Element | undefined;

      // Title already set, ignore.
      if (codeTitleBar) {
        return;
      }

      // Resolve the language
      const preElement = element.children.find(
        (node) =>
          node.type === "element" &&
          node.tagName === "pre" &&
          "data-language" in node.properties!
      ) as Element | undefined;

      if (!preElement) {
        return;
      }

      const language = preElement.properties?.["data-language"] as string;

      if (!language || language.length === 0) {
        return;
      }

      element.children.unshift({
        type: "element",
        tagName: "div",
        properties: {
          "data-rehype-pretty-code-title": "",
        },
        children: [
          {
            type: "text",
            value: transformLanguage(language),
          },
        ],
      });
    });
  };
};
