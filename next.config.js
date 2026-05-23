/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
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
};

module.exports = nextConfig;
