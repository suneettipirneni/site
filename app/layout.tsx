import { NavBar } from "@/components/NavBar";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import { IoInformationCircleSharp } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { PropsWithChildren } from "react";

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
				className={`${inter.className} ${jetBrainsMono.variable} bg-150 mx-auto flex h-full w-full scroll-pt-[65px] flex-col items-center overflow-y-auto bg-gray-50 bg-cover bg-no-repeat text-black dark:bg-black dark:text-white`}
			>
				<NavBar
					tabs={[
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
