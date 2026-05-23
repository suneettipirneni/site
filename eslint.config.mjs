import { defineConfig } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import unusedImports from "eslint-plugin-unused-imports";
export default defineConfig([
	{
		ignores: [".next/**", ".yarn/**"],
	},
	{
		extends: [...nextCoreWebVitals],

		plugins: {
			"unused-imports": unusedImports,
		},

		rules: {
			"unused-imports/no-unused-imports": "error",
		},
	},
]);
