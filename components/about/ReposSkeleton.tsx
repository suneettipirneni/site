export function ReposSkeleton() {
	return (
		<div className="grid w-full max-w-[600px] grid-cols-1 gap-2 md:grid-cols-2">
			{Array.from({ length: 6 }).map((_, i) => (
				<div key={i} className="flex w-full flex-col gap-x-3 gap-y-2 rounded-xl bg-gray-200/60 p-2 dark:bg-white/10 md:min-h-[100px] md:p-5">
					{/* Profile and repo name skeleton */}
					<div className="flex items-center gap-x-2">
						<div className="h-[25px] w-[25px] rounded-full bg-gray-300/60 dark:bg-white/20 animate-pulse" />
						<div className="h-4 w-32 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
					</div>
					
					{/* Description skeleton */}
					<div className="space-y-2">
						<div className="h-3 w-full bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
						<div className="h-3 w-3/4 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
					</div>
					
					{/* Stats skeleton */}
					<div className="flex w-full grow flex-row items-center gap-x-2 self-end mt-2">
						<div className="h-3 w-8 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
						<div className="h-3 w-8 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
						<div className="ml-auto flex items-center gap-x-1">
							<div className="h-[10px] w-[10px] rounded-full bg-gray-300/60 dark:bg-white/20 animate-pulse" />
							<div className="h-3 w-12 bg-gray-300/60 dark:bg-white/20 rounded animate-pulse" />
						</div>
					</div>
				</div>
			))}
		</div>
	);
}