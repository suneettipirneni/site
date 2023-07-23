import { PropsWithChildren } from "react";
import Image from "next/image";
import background from "../../public/thunk.png";
import backgroundDark from "../../public/thunk-dark.png";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Thunk Tank - A Blog",
	description:
		"A set of written entries with varying amounts of quality, and ranging topics. I write about things I find useful, interesting, or just want to share (usually in the domain of software). If you find anything that seems off or incorrect, I'm open to PRs.",
};

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
				/>
			</picture>

			{children}
		</div>
	);
}
