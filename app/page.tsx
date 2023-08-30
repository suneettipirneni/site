import { Profile } from "@/components/Profile";
import profileBg from "../public/profile-bg.webp";
import profileBgDark from "../public/profile-bg-dark.webp";
import Image from "next/image";

export default function Home() {
	return (
		<div className="flex grow flex-col items-center justify-center space-y-3 overflow-hidden bg-fixed bg-center md:space-y-5 lg:space-y-10">
			<picture>
				<source
					srcSet={profileBgDark.src}
					media="(prefers-color-scheme: dark)"
				/>
				<Image
					src={profileBg}
					alt=""
					placeholder="blur"
					className="fixed inset-0 -z-10 hidden aspect-video w-full bg-fixed object-cover md:visible"
					priority
				/>
			</picture>

			<Profile />
		</div>
	);
}
