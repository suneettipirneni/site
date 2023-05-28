import { HTMLAttributes } from "react";
import NextImage, { ImageProps } from "next/image";

export function Image(props: HTMLAttributes<HTMLImageElement> & ImageProps) {
  return (
    <div
      data-image-container
      className="flex flex-col items-center justify-center w-full"
    >
      <NextImage
        data-image-contents
        className="rounded-lg overflow-clip border border-gray-300 dark:border-white/25"
        {...props}
      />
    </div>
  );
}
