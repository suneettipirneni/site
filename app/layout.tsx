import { NavBar } from "@/components/NavBar";
import { Inter, JetBrains_Mono } from "next/font/google";
// import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

export const metadata = {
	title: "Suneet Tipirneni",
	description: "The personal website of Suneet Tipirneni",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" style={{ fontFeatureSettings: "cv02, cv03, cv04, cv11" }}>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
				/>
			</head>

			<body
				className={`${inter.className} ${jetBrainsMono.variable} bg-150 mx-auto flex w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-white bg-cover bg-no-repeat text-black dark:bg-black dark:text-white`}
			>
				<NavBar
					tabs={[
						{
							name: "Blog",
							href: "blog/",
						},
						{
							name: "Projects",
							href: "projects/",
						},
					]}
				/>
				<div className="h-full w-full grow p-2 pt-nav md:p-5">{children}</div>
				{/* <Analytics /> */}
			</body>
		</html>
	);
}
