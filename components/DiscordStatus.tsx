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

export function DiscordStatus({ className }: DiscordStatusProps) {
	const lanyard = useLanyard({
		userId: "386337006764032002",
	});

	const color = lanyard.isLoading
		? "bg-gray-500"
		: statusColors[lanyard.data?.data.discord_status ?? "offline"];

	return (
		<div className={`flex flex-row items-center gap-2 ${className}`}>
			<h3 className="text-left font-medium capitalize">
				{lanyard.data?.data.discord_status ?? "Loading..."}
			</h3>
			<div className={`h-3 w-3 rounded-full ${color}`} />
		</div>
	);
}
