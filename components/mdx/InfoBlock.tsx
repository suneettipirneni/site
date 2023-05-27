"use client";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { IoInformationCircleSharp, IoWarning } from "react-icons/io5";
import { MdDangerous } from "react-icons/md";
import { useState } from "react";

export interface InfoBlockProps {
  title: string;
  kind: "info" | "warning" | "danger";
  children?: React.ReactNode;
}

const mappedIcons = {
  info: <IoInformationCircleSharp />,
  warning: <IoWarning />,
  danger: <MdDangerous />,
};

const mappedStyles = {
  info: "dark:bg-white/10 bg-white/30 border-gray-300 dark:border-white/25",
  warning: "bg-yellow-400/50 border-yellow-400",
  danger: "bg-red-400/50 border-red-400",
};

export function InfoBlock({ title, kind, children }: InfoBlockProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`grid grid-cols-[80%_1fr] rounded-lg p-3 border mb-5 gap-y-4 ${mappedStyles[kind]}`}
    >
      <h1
        className="flex col-start-1 text-lg font-bold items-center gap-2 cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <span>{mappedIcons[kind]}</span>
        {title}
      </h1>

      <div
        className="col-span-1 justify-self-end self-center cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        {open ? <FaChevronDown /> : <FaChevronRight />}
      </div>

      <div
        className={`${open ? "flex flex-col gap-y-5" : "hidden"} col-span-2`}
      >
        {children}
      </div>
    </div>
  );
}
