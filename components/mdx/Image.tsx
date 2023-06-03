import { HTMLAttributes } from "react";
import NextImage, { ImageProps } from "next/image";

export function Image(props: HTMLAttributes<HTMLImageElement> & ImageProps) {
	return (
		<div className="flex w-full flex-col items-center justify-center post:mb-4">
			<NextImage
				className="overflow-clip rounded-lg border border-gray-300 dark:border-white/25"
				{...props}
			/>
		</div>
	);
}
