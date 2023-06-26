import { NavBar } from "@/components/NavBar";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/util/constants";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const jetBrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-mono",
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
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
				className={`${inter.className} ${jetBrainsMono.variable} mx-auto flex min-h-screen w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-white bg-cover bg-no-repeat text-black dark:bg-black dark:text-white`}
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
				<div className="h-full w-full grow p-2 md:p-5">{children}</div>
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
