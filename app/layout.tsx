import { NavBar } from "@/components/NavBar";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/util/constants";
import "katex/dist/katex.min.css";

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
			<body
				className={`${inter.className} ${jetBrainsMono.variable} mx-auto flex h-full min-h-screen w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-slate-50 bg-cover bg-no-repeat text-black dark:bg-zinc-950 dark:text-white`}
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
				<div className="flex min-h-full w-full grow content-stretch">
					{children}
				</div>
				<Analytics />
			</body>
		</html>
	);
}
