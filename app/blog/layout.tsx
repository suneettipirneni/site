import { PropsWithChildren } from "react";
import Image from "next/image";
import background from "../../public/thunk.webp";
import backgroundDark from "../../public/thunk-dark.webp";

export default function BlogLayout({ children }: PropsWithChildren) {
	return (
		<div className="flex w-full justify-center">
			<picture>
				<source
					srcSet={backgroundDark.src}
					media="(prefers-color-scheme: dark)"
				/>
				<Image
					src={background}
					alt=""
					placeholder="blur"
					className="absolute inset-0 top-0 -z-10  h-[400px] w-screen overflow-clip object-fill md:h-[700px]"
					priority
				/>
			</picture>

			{children}
		</div>
	);
}
