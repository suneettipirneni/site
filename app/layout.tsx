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
      <body
        className={`${inter.className} dark:text-white text-black mx-auto h-screen flex flex-col items-center bg-[url('/background.png')] dark:bg-zinc-950 bg-150 bg-cover w-full pt-5 px-5`}
      >
        <Header
          tabs={[
            { name: "Home", href: "/", icon: <BsHouseFill /> },
            {
              name: "About",
              href: "about/",
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
        {children}
      </body>
    </html>
  );
}
