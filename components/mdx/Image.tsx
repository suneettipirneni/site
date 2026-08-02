import NextImage, { ImageProps } from "next/image";

type MdxImageProps = Omit<ImageProps, "alt" | "height" | "width"> & {
	"data-image-height"?: ImageProps["height"];
	"data-image-width"?: ImageProps["width"];
	alt?: string;
};

export function Image({
	alt = "",
	className,
	"data-image-height": imageHeight = 630,
	"data-image-width": imageWidth = 1200,
	...props
}: MdxImageProps) {
	return (
		<div className="flex w-full flex-col items-center justify-center border-y border-border post:-mx-[var(--space-page)] post:mb-4 post:w-auto">
			<NextImage
				alt={alt}
				height={imageHeight}
				width={imageWidth}
				className={`w-full grayscale ${className ?? ""}`}
				{...props}
			/>
		</div>
	);
}
