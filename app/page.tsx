import { HeroText } from "@/components/HeroText";
import { Profile } from "@/components/Profile";
import { Subtitle } from "@/components/Subtitle";
import Balancer from "react-wrap-balancer";
import { ProfileFooter } from "@/components/ProfileFooter";
import { BackgroundImage } from "@/components/BackgroundImage";
import profileBg from "../public/profile-bg.png";
import profileBgDark from "../public/profile-bg-dark.png";
import Image from "next/image";

export default function Home() {
	return (
		<div className="mt-10 flex grow flex-col items-center justify-center space-y-10 overflow-hidden bg-fixed">
			<picture>
				<source
					srcSet={profileBgDark.src}
					media="(prefers-color-scheme: dark)"
				/>
				<Image
					src={profileBg}
					alt=""
					className="fixed inset-0 -z-10 h-full w-full bg-fixed object-cover"
				/>
			</picture>

			<Profile />
			<HeroText className="line-clamp-3 max-w-[600px] text-center font-semibold">
				<Balancer>
					{"Hello! I'm"} <span className="gradient-text font-bold">Suneet</span>{" "}
					{"and this is a website"}
				</Balancer>
			</HeroText>
			<Subtitle className="max-w-[450px] text-center text-gray-500 dark:text-gray-200/70">
				<Balancer>
					{
						"I'm an amateur developer from Orlando, Florida working on anything that seems nifty."
					}
				</Balancer>
			</Subtitle>
			<ProfileFooter />
		</div>
	);
}
