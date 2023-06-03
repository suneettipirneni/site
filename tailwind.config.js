const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./contentlayer.config.ts",
		"./rehype/**/*.ts",
	],
	theme: {
		fontFamily: {
			mono: "var(--font-mono)",
		},
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		plugin(function ({ addVariant }) {
			addVariant("post", "[data-post=true]>&");
		}),
		require("@tailwindcss/container-queries"),
	],
};
