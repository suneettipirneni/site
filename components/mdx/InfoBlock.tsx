import { IoInformationCircleSharp, IoWarning } from "react-icons/io5";
import { MdDangerous } from "react-icons/md";

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
  info: "bg-blue-400 border-blue-600",
  warning: "bg-yellow-400 border-yellow-600",
  danger: "bg-red-400 border-red-600",
};

export function InfoBlock({ title, kind, children }: InfoBlockProps) {
  return (
    <div
      className={`flex flex-col rounded-lg p-5 border ${mappedStyles[kind]}`}
    >
      <h1 className="flex flex-row text-2xl font-bold items-center gap-2">
        {mappedIcons[kind]}
        {title}
      </h1>

      {children}
    </div>
  );
}
