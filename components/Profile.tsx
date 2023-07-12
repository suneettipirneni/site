"use client";

import Image from "next/image";
import profilePic from "@/public/me.png";
import { DiscordStatus } from "./DiscordStatus";

export function Profile() {
	let options = {
		timeZone: "America/New_York",
		hour: "numeric",
		minute: "numeric",
	} as const;

	let time = new Intl.DateTimeFormat("en-US", options).format(new Date());

	return (
		<div className="flex flex-row gap-5">
			<Image
				src={profilePic}
				alt="Profile Picture"
				className="h-[100px] w-[100px] rounded-full bg-[url('https://avatars.githubusercontent.com/u/77477100?v=4')] bg-cover"
			/>

			<div className="flex flex-col items-center justify-center rounded-xl bg-black/10 px-5 py-2 dark:bg-black dark:bg-gray-200/10 ">
				<DiscordStatus className="w-full" />
				<h2 className="w-full text-xl font-medium">
					{"It's"} <span className="font-semibold">{time}</span> {"for me!"}
				</h2>
			</div>
		</div>
	);
}
