export function ProfileSkeleton() {
	return (
		<div className="mb-10 flex w-full max-w-[600px] flex-col gap-y-3 rounded-lg">
			<div className="flex items-center gap-x-1">
				<div className="h-[50px] w-[50px] rounded-full bg-gray-300/60 dark:bg-white/20 animate-pulse" />
			</div>

			<div className="w-full flex-col gap-y-1">
				<div className="flex w-full flex-row items-center gap-x-1 rounded-xl text-sm text-gray-500 dark:text-gray-400 mb-2">
					<div className="flex items-center gap-2">
						<div className="h-3 w-3 rounded-full bg-gray-300/60 dark:bg-white/20 animate-pulse" />
						<div className="h-4 w-16 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
					</div>
					<span>&mdash;</span>
					<div className="h-4 w-4 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
					<div className="h-4 w-20 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
				</div>
				<div className="h-9 w-64 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
			</div>
		</div>
	);
}