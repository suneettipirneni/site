import { HTMLAttributes } from "react";
import NextImage, { ImageProps } from "next/image";

export function Image(props: HTMLAttributes<HTMLImageElement> & ImageProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full mb-4">
      <NextImage
        className="rounded-lg overflow-clip border border-gray-300 dark:border-gray-600"
        {...props}
      />
      <p className="text-center font-medium p-3 w-full grow">{props.title}</p>
    </div>
  );
}
