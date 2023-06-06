import { TabBar } from "@/components/TabBar";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { BsHouseFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonSharp } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" style={{ fontFeatureSettings: "cv02, cv03, cv04, cv11" }}>
			<head>
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
				/>
			</head>

			<body
				className={`${inter.className} ${jetBrainsMono.variable} bg-150 mx-auto flex h-screen w-full flex-col items-center bg-gray-50 bg-cover bg-no-repeat px-2 py-2 text-black dark:bg-zinc-950 dark:text-white md:px-5 md:pt-5`}
			>
				<TabBar
					tabs={[
						{ name: "Home", href: "/", icon: <BsHouseFill /> },
						{
							name: "Blog",
							href: "blog/",
							icon: <IoInformationCircleSharp />,
						},
						{
							name: "Projects",
							href: "projects/",
							icon: <HiCodeBracketSquare />,
						},
					]}
				/>
				<div className="h-full w-full p-2 md:p-5">{children}</div>
				<Analytics />
			</body>
		</html>
	);
}
