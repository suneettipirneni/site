My website, wow very cool.

## Linting

Run `pnpm lint` for Oxlint checks and `pnpm lint:fix` to apply fixes.
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

The migration omits React's deprecated-API rule (its Oxlint replacement needs
type-aware linting), and compiler `config`/`gating` checks (Oxlint uses fixed
compiler options). JSX usage tracking is built into Oxlint's unused-variable
analysis. TypeScript checking remains a separate `pnpm exec tsc --noEmit` step.
