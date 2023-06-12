import { HeroText } from "@/components/HeroText";
import { Profile } from "@/components/Profile";
import { Subtitle } from "@/components/Subtitle";
import Balancer from "react-wrap-balancer";
import { ProfileFooter } from "@/components/ProfileFooter";

export default function Home() {
	return (
		<div className="my-auto mt-10 flex h-full flex-col items-center justify-center space-y-10 md:mt-20 lg:mt-40">
			<Profile />
			<HeroText className="line-clamp-3 max-w-[600px] text-center">
				<Balancer>{"Hello! I'm Suneet and this is a website"}</Balancer>
			</HeroText>
			<Subtitle className="max-w-[450px] text-center text-gray-400 dark:text-gray-200/70">
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
