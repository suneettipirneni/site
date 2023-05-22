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
    <div className={`flex flex-row gap-2 items-center ${className}`}>
      <h3 className="capitalize font-medium text-left">
        {lanyard.data?.data.discord_status ?? "Loading..."}
      </h3>
      <div className={`rounded-full h-3 w-3 ${color}`} />
    </div>
  );
}
