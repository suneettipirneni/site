import { Header } from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import { BsHouseFill } from "react-icons/bs";
import { IoInformationCircleSharp, IoPersonSharp } from "react-icons/io5";
import { HiCodeBracketSquare } from "react-icons/hi2";
import "./globals.css";

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
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
      ></link>
      <body
        className={`${inter.className} dark:text-white bg-black text-black mx-auto h-screen flex flex-col items-center bg-[url('/background.png')] dark:bg-zinc-950 bg-150 bg-cover bg-fixed w-full pt-5 px-5`}
      >
        <Header
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
            { name: "Contact", href: "contact/", icon: <IoPersonSharp /> },
          ]}
        />
        <div className="p-5 h-full w-full max-w-[900px]">{children}</div>
      </body>
    </html>
  );
}
