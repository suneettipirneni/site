"use client";

import NextLink from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Link = motion(NextLink);

export function TabBar({
  tabs,
}: {
  tabs: { name: string; href: string; icon?: ReactNode }[];
}) {
  const path = usePathname();

  const isActive = (tab: string) =>
    tab.replaceAll("/", "") === path.toLowerCase().replaceAll("/", "");

  return (
    <div className="flex sticky top-6 backdrop-blur flex-row justify-between p-1 rounded-full bg-black/5 dark:bg-black/30 shadow-sm border z-0 border-gray-400/10 dark:border-gray-800">
      {tabs.map((tab, index) => (
        <Link
          key={tab.name}
          layout
          className={`flex flex-row items-center justify-between z-10 transition text-md lg:text-2xl relative px-4 py-1 font-[600] ${
            isActive(tab.href) ? "text-black dark:text-black" : "text-black/70"
          } dark:text-white`}
          href={`/${tab.href}`}
        >
          {isActive(tab.href) && (
            <motion.span
              key={`outer-${tab.name}`}
              layout
              transition={{
                type: "spring",
                duration: 0.5,
              }}
              layoutId="selectedTab"
              className="absolute inset-0 -z-10 dark:bg-white bg-white rounded-full"
            />
          )}

          <motion.h1 layout>{`${tab.name}`}</motion.h1>
        </Link>
      ))}
    </div>
  );
}
