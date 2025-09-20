import { NavBar } from "@/components/NavBar";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "katex/dist/katex.min.css";
import AutoRefresh from "@/components/AutoRefresh";

// Font configuration that falls back gracefully
const fontClasses = "font-sans";
const monoFontVariable = "--font-mono";

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: "Suneet Tipirneni",
	description: "The personal website of Suneet Tipirneni",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<AutoRefresh>
			<html lang="en">
				<head>
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
					<link 
						href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap" 
						rel="stylesheet" 
					/>
				</head>
				<body
					className={`${fontClasses} mx-auto flex h-full min-h-screen w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-slate-50 bg-cover bg-no-repeat text-black dark:bg-zinc-950 dark:text-white`}
					style={{ "--font-mono": "'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace" } as React.CSSProperties}
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
