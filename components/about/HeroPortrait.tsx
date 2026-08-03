import Image from "next/image";
import profilePicture from "@/public/me.webp";

export interface HeroPortraitProps {
	className?: string;
}

export function HeroPortrait({ className }: HeroPortraitProps) {
	return (
		<div
			className={`relative aspect-square overflow-hidden rounded-md ${
				className ?? ""
			}`}
		>
			<Image
				src={profilePicture}
				alt="Portrait of Suneet Tipirneni"
				fill
				className="object-cover object-[50%_45%]"
				sizes="4rem"
				preload
			/>
		</div>
	);
}
