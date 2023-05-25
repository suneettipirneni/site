import { TabBar } from "@/components/TabBar";
import "./globals.css";
import { Inter } from "next/font/google";
import { BsHouseFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonSharp } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], display: "swap" });

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
        className={`${inter.className} dark:text-white bg-neutral-50 text-black mx-auto h-screen flex flex-col items-center bg-[url('/background2.png')] dark:bg-zinc-950 bg-150 bg-cover bg-no-repeat w-full md:pt-5 md:px-5 max-w-[1000px] py-2 px-2`}
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
        <div className="p-2 md:p-5 h-full w-full">{children}</div>
        <Analytics />
      </body>
    </html>
  );
}
