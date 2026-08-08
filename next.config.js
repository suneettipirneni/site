/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	partialPrefetching: true,
	pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				port: "",
				pathname: "/u/**",
			},
		],
	},
	reactCompiler: true,
	turbopack: {
		rules: {
			"*.mdx": {
				condition: { query: "?raw" },
				loaders: ["raw-loader"],
				as: "*.js",
			},
		},
	},
};

module.exports = nextConfig;
