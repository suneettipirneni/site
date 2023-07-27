import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import type { PropsWithChildren } from "react";
import "./globals.css";
import { Metadata } from "next";
import { BASE_URL } from "@/util/constants";
import "katex/dist/katex.min.css";
import { PageShell } from "@/components/PageShell";

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
				className={`${inter.className} ${jetBrainsMono.variable}  bg-slate-50 text-black  dark:bg-zinc-950 dark:text-white`}
			>
				<PageShell>{children}</PageShell>
				<Analytics />
			</body>
		</html>
	);
}
