import { NavBar } from "@/components/NavBar";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "katex/dist/katex.min.css";
import AutoRefresh from "@/components/AutoRefresh";

const geist = Geist({
	subsets: ["latin"],
	variable: "--font-geist",
});

const geistMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-geist-mono",
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: "Suneet Tipirneni",
	description: "The personal website of Suneet Tipirneni",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<AutoRefresh>
			<html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
				<body
					className={`${geist.className} mx-auto flex h-full min-h-screen w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-slate-50 bg-cover bg-no-repeat text-black dark:bg-zinc-950 dark:text-white`}
				>
					<NavBar
						tabs={[
							{
								name: "Blog",
								href: "blog/",
							},
						]}
					/>
					<div className="flex min-h-full w-full grow content-stretch">
						{children}
					</div>
					<Analytics />
					<SpeedInsights />
				</body>
			</html>
		</AutoRefresh>
	);
}
