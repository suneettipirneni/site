"use client";

import Image from "next/image";
import profilePic from "@/public/me.webp";
import { useEffect, useState } from "react";
import { DiscordStatus } from "../DiscordStatus";
import { HiOutlineClock } from "react-icons/hi";

const timeOptions = {
	timeZone: "America/New_York",
	hour: "numeric",
	minute: "numeric",
} as const;

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
		setTime(new Intl.DateTimeFormat("en-US", timeOptions).format(new Date()));
		const interval = setInterval(() => {
			setTime(new Intl.DateTimeFormat("en-US", timeOptions).format(new Date()));
		}, 10_000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="mb-10 flex w-full max-w-[600px] flex-col gap-y-3 rounded-lg">
			<div className="flex items-center gap-x-1">
				<Image
					src={profilePic}
					alt="Profile Picture"
					className="h-[50px] w-[50px] rounded-full bg-cover md:h-[50px] md:w-[50px] lg:h-[50px] lg:w-[50px]"
				/>
			</div>

			<div className="w-full flex-col gap-y-1">
				<div className="flex w-full flex-row items-center gap-x-1 rounded-xl text-sm text-gray-500 dark:text-gray-400">
					<DiscordStatus className="font-medium" />
					&mdash;
					<HiOutlineClock size={18} title="My Local Time" />
					<span className="w-full font-medium">
						<span suppressHydrationWarning>{time}</span>
					</span>
				</div>
				<h1 className="text-3xl font-bold">Suneet Tipirneni</h1>
			</div>
		</div>
	);
}
