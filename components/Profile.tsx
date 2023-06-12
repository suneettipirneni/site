"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextImage, { type ImageProps } from "next/image";

import profilePic from "@/public/me.png";

import { DiscordStatus } from "./DiscordStatus";

const Image = motion<Omit<ImageProps, "layout">>(NextImage);

export function Profile() {
	const [isHovering, setIsHovering] = useState(false);

	let options = {
		timeZone: "America/New_York",
		hour: "numeric",
		minute: "numeric",
	} as const;

	let time = new Intl.DateTimeFormat("en-US", options).format(new Date());

	return (
		<motion.div
			className="flex flex-row gap-5"
			layout
			layoutId="profile"
			onHoverStart={() => setIsHovering(true)}
			onHoverEnd={() => setIsHovering(false)}
		>
			<AnimatePresence>
				<Image
					layout
					src={profilePic}
					alt="Profile Picture"
					className="h-[100px] w-[100px] rounded-full bg-[url('https://avatars.githubusercontent.com/u/77477100?v=4')] bg-cover"
				/>

				{isHovering && (
					<motion.div
						layout
						key="profile-hover"
						initial={{ opacity: 0, y: -50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -50 }}
						className="flex h-[100px] flex-col items-center rounded-lg bg-white p-7 shadow-lg dark:bg-gray-200/20"
					>
						<h2 className="w-full text-xl font-medium">
							{"It's"} <span className="font-bold">{time}</span> {"for me!"}
						</h2>
						<DiscordStatus className="w-full" />
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
}
