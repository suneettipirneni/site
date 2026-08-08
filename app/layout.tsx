import { NavBar } from "@/components/NavBar";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { type PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/lib/constants";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "katex/dist/katex.min.css";
import { BlockScrollbar } from "@/components/BlockScrollbar";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: "Suneet Tipirneni",
	description: "The personal website of Suneet Tipirneni",
};

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" className={inter.variable}>
			<body
				className={`${inter.className} min-h-dvh mx-auto flex w-full flex-col bg-background text-foreground antialiased`}
			>
				<a
					href="#main-content"
					className="sr-only z-50 bg-background px-4 py-3 text-sm font-medium focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
				>
					Skip to content
				</a>
				<NavBar />
				<MotionProvider>
					<main id="main-content" className="isolate flex w-full grow">
						{children}
					</main>
				</MotionProvider>
				<BlockScrollbar />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
