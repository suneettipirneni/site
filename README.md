My website, wow very cool.

## Linting

Run `pnpm lint` for Oxlint checks and TypeScript compiler diagnostics, and
`pnpm lint:fix` to apply fixes. Type-aware linting and type checking use
`oxlint-tsgolint`, pinned to a release based on TypeScript 7.0.2.
Run `pnpm typecheck` for an independent check using TypeScript 7's native `tsc`.
Next.js also uses that project-local CLI for type checking during `pnpm build`.
Prettier continues to handle formatting.

`.oxlintrc.json` carries over the Next.js Core Web Vitals, React Hooks,
React Compiler, and accessibility rules. The Next.js plugin supplies
`no-location-assign-relative-destination` through Oxlint's JavaScript plugin
compatibility layer until a native implementation is available.
This compatibility layer is alpha; Oxlint is pinned to a tested version.
ESLint remains a transitive peer dependency of the Next.js plugin's utilities,
but no ESLint command or config is used.

Unused imports and variables are errors; unused parameters and catch bindings
are allowed. Automatic unused-symbol removal is limited to imports.

`typescript/no-deprecated` replaces React's deprecated-API rule using type-aware
analysis; it also checks other APIs marked deprecated in their type declarations.
The migration omits compiler `config`/`gating` checks (Oxlint uses fixed compiler
options). JSX usage tracking is built into Oxlint's unused-variable analysis.
