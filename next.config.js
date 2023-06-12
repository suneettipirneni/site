const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
	modularizeImports: {
		"react-icons": {
			transform: "react-icons/{{member}}",
		},
	},
});

module.exports = nextConfig;
