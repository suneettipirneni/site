/** @type {import('next').NextConfig} */
const nextConfig = {
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
		formats: ["image/webp", "image/avif"],
	},
	experimental: {
		reactCompiler: true,
	},
	compiler: {
		removeConsole: process.env.NODE_ENV === "production",
	},
};

module.exports = nextConfig;
