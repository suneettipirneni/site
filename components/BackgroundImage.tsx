import Image, { type ImageProps } from "next/image";
import { PropsWithChildren } from "react";

export function BackgroundImage({
	className = "",
	children,
	...props
}: PropsWithChildren<ImageProps>) {
	return (
		<div className={`${className}`}>
			{/* eslint-disable-next-line jsx-a11y/alt-text */}
		</div>
	);
}
