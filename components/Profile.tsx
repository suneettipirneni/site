"use client";

import Image from "next/image";
import profilePic from "@/public/me.webp";
import { useEffect, useState } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { DiscordStatus } from "./DiscordStatus";
import { HiOutlineClock } from "react-icons/hi";

// TODO: Use native js apis for localized time when https://github.com/vercel/next.js/issues/52698 is fixed

// const timeOptions = {
// 	timeZone: "America/New_York",
// 	hour: "numeric",
// 	minute: "numeric",
// } as const;

export function Section({
	children,
	title,
}: {
	children: React.ReactNode;
	title: string;
}) {
	return (
		<div className="flex flex-col gap-y-2">
			<h3 className="font-semibold">{title}</h3>
			{children}
		</div>
	);
}

export function Profile() {
	const [time, setTime] = useState("--:-- --");
	useEffect(() => {
		setTime(formatInTimeZone(new Date(), "America/New_York", "h:mm a"));
		const interval = setInterval(() => {
			setTime(formatInTimeZone(new Date(), "America/New_York", "h:mm a"));
		}, 10_000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex w-full max-w-[600px] flex-col gap-y-3 px-3">
			<div className="flex items-center gap-x-1">
				<Image
					src={profilePic}
					alt="Profile Picture"
					className="h-[50px] w-[50px] rounded-full bg-cover md:h-[50px] md:w-[50px] lg:h-[50px] lg:w-[50px]"
				/>
			</div>

			<div className="w-full flex-col gap-y-1">
				<div className="flex flex-row items-center gap-x-1 rounded-xl text-sm text-gray-500">
					<DiscordStatus className="font-medium" />
					&mdash;
					<HiOutlineClock size={18} title="My Local Time" />
					<span className="w-full font-medium">
						<span suppressHydrationWarning>{time}</span>
					</span>
				</div>
				<h1 className="text-3xl font-bold">Suneet Tipirneni </h1>
			</div>

			<span className="text-gray-600 dark:text-gray-400">
				{
					"I'm a student and avid open source developer currently pursuing a master's degree in computer vision. I'm passionate about building tools that are accessible and useful to others."
				}
			</span>
		</div>
	);
}
