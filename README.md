My website, wow very cool.

## Runnable React examples in MDX

Use `ReactExample` in any post without an import. Readers select **Run example**
to load the editor and preview, then edits automatically recompile. **Reset code**
restores the original files and restarts the preview runtime, including after a compilation error.
Use the file tabs or collapsible folder browser to navigate. The expand control
provides more room for longer examples; refresh restarts the preview.
Drag the dividers to resize the code, preview, and desktop file browser. Focus a
divider and use arrow keys to resize with the keyboard; double-click to restore
its default split. On small screens the code and preview resize vertically.
The collapsed **Console** below the example captures logs and warnings even while
closed. Open it to inspect output or clear it; preview restarts clear old output. Examples are wider than prose; code and preview are
side by side on desktop and stack on small screens. Posts with examples use the
inline outline disclosure to leave room for the wider component.

```mdx
<ReactExample
	title="Hello React"
	activeFile="/App.js"
	files={{
		"/App.js": `import Greeting from "./components/Greeting";
export default function App() { return <Greeting />; }`,
		"/components/Greeting.js": `export default function Greeting() {
  return <h1>Hello from another folder</h1>;
}`,
	}}
/>
```

File keys are absolute virtual paths. Add any number of folders and use ordinary
relative imports between files. Values can be source strings or
`{ code: "...", hidden: true, readOnly: true }` objects. Template support files
are hidden from the explorer unless explicitly included in `files`.
TypeScript is detected automatically from `.ts` and `.tsx` files. You can also
set `template="react-ts"` explicitly. Use `/App.tsx` for the entry and optionally pass
`dependencies={{ "package-name": "version" }}` for npm packages. Keep the template's
`/App.js` or `/App.tsx` entry, or supply your own `/index.js` or `/index.tsx`.

Execution uses Sandpack's remote bundler and an isolated preview iframe; it needs
network access to CodeSandbox and package delivery services. Edits are local to
the current page and are not saved to the article. See
`posts/tour-of-components.mdx` for a runnable example with components, hooks, and CSS.

### Tailwind

Add the `tailwind` prop to enable Tailwind v4 utilities with no configuration:

```mdx
<ReactExample
	tailwind
	files={{
		"/App.tsx": `export default function App() {
  return <p className="p-6 text-xl font-semibold">Hello Tailwind</p>;
}`,
	}}
/>
```

Tailwind's browser compiler loads only in an opted-in example's isolated preview,
after Run example. It observes class changes as you edit. Existing examples keep
their CSS unchanged. This is a playground runtime, not a production Tailwind build
pipeline; build plugins and project PostCSS configuration are not loaded.
TypeScript is transpiled for execution with syntax highlighting; the editor does
not provide a TypeScript language server or full semantic type checking.
