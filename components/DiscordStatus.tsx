"use client";

import { DISCORD_USER_ID } from "@/lib/constants";
import { useLanyard } from "react-use-lanyard";

export interface DiscordStatusProps {
	className?: string;
}

const statusColors = {
	online: "bg-green-500",
	idle: "bg-yellow-500",
	dnd: "bg-red-500",
	offline: "bg-gray-500",
} as const;

const statusMappings = {
	online: "Online",
	idle: "Idle",
	dnd: "Do Not Disturb",
	offline: "Offline",
} as const;

export function DiscordStatus({ className }: DiscordStatusProps) {
	const lanyard = useLanyard({
		userId: DISCORD_USER_ID,
	});

	const status = lanyard.data?.data.discord_status;

	const color = lanyard.isLoading
		? "bg-gray-500"
		: statusColors[lanyard.data?.data.discord_status ?? "offline"];

	return (
		<div className={`flex max-w-full flex-row items-center gap-2 ${className}`}>
			<div className={`h-3 w-3 shrink-0 rounded-full ${color}`} />
			<p className="w-full whitespace-nowrap">
				{status ? statusMappings[status] : "Loading..."}
			</p>
		</div>
	);
}
