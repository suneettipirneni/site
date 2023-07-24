"use client";

import Image from "next/image";
import profilePic from "@/public/me.png";
import { DiscordStatus } from "./DiscordStatus";
import { useEffect, useState } from "react";

const timeOptions = {
	timeZone: "America/New_York",
	hour: "numeric",
	minute: "numeric",
} as const;

export function Profile() {
	const [time, setTime] = useState(
		new Intl.DateTimeFormat("en-US", timeOptions).format(new Date())
	);

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Intl.DateTimeFormat("en-US", timeOptions).format(new Date()));
		}, 10_000);
		return () => clearInterval(interval);
	});

	return (
		<div className="flex flex-row sm:gap-3 md:gap-5">
			<Image
				src={profilePic}
				alt="Profile Picture"
				className="h-[60px] w-[60px] rounded-full bg-[url('https://avatars.githubusercontent.com/u/77477100?v=4')] bg-cover md:h-[80px] md:w-[80px] lg:h-[100px] lg:w-[100px]"
			/>

			<div className="hidden flex-col items-center justify-center rounded-xl bg-white/50 px-5 py-2 dark:bg-black dark:bg-white/10 md:flex ">
				<DiscordStatus className="w-full" />
				<span className="w-full text-xl font-medium">
					{"It's"} <span className="font-semibold">{time}</span> {"for me!"}
				</span>
			</div>
		</div>
	);
}
