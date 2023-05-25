/* eslint-disable @next/next/no-img-element */
import { HTMLAttributes } from "react";
import NextImage, { ImageProps } from "next/image";

export function Image(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <div className="inline-flex items-center justify-center w-full">
      <div className="inline-flex flex-col bg-gray-200/50 dark:bg-gray-700 items-center rounded-lg my-2 overflow-clip border border-gray-300 dark:border-gray-600 basis-auto">
        <div className="inline-flex flex-col">
          {/* Alt text should be provided from source. */}
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img {...props} />
          <p className="table-caption text-center font-medium p-3 w-full grow">
            {props.title}
          </p>
        </div>
      </div>
    </div>
  );
}
