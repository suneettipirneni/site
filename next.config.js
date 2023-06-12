const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = withContentlayer({
	modularizeImports: {
		transform: "react-icons/{{member}}",
	},
});

module.exports = nextConfig;
