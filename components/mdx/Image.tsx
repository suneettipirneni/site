import NextImage, { ImageProps } from "next/image";

type MdxImageProps = Omit<ImageProps, "alt" | "height" | "width"> & {
	"data-image-height"?: ImageProps["height"];
	"data-image-width"?: ImageProps["width"];
	alt?: string;
};

export function Image({
	alt = "",
	className,
	style,
	"data-image-height": imageHeight = 630,
	"data-image-width": imageWidth = 1200,
	...props
}: MdxImageProps) {
	return (
		<div className="mdx-image">
			<NextImage
				alt={alt}
				height={imageHeight}
				width={imageWidth}
				style={{ width: Number(imageWidth), ...style }}
				className={`h-auto max-w-full ${className ?? ""}`}
				{...props}
			/>
		</div>
	);
}
