"use client";

import React, { type ComponentPropsWithoutRef, type ReactNode } from "react";

export type ButtonProps<C extends React.ElementType = "button"> = {
  title: string;
  icon: ReactNode;
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, "as">;

export function Button<C extends React.ElementType = "button">({
  title,
  icon,
  whileHover,
  as,
  ...props
}: ButtonProps<C>) {
  const Component = as ?? "button";

  return (
    <Component
      whileHover={whileHover}
      transition={{ type: "spring", bounce: 0.3 }}
      className="rounded-xl bg-gray-600/25 text-black px-5 py-3 gap-x-2 flex items-center dark:bg-white/10 dark:text-white"
      {...props}
    >
      {icon}
      <h1 className="font-bold text-[18px]">{title}</h1>
    </Component>
  );
}
