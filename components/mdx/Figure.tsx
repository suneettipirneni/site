import { PropsWithChildren } from "react";

export interface FigureProps extends PropsWithChildren {
  caption: string;
}

export function Figure({ caption, children }: FigureProps) {
  return (
    <div className="flex flex-col gap-y-3 items-center justify-center post:mb-4">
      {children}
      <figcaption className="text-sm text-center font-medium w-full grow">
        {caption}
      </figcaption>
    </div>
  );
}
