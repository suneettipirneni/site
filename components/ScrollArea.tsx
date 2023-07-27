"use client";

import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import type { PropsWithChildren, UIEventHandler } from "react";

export interface ScrollAreaProps extends PropsWithChildren {
	children?: React.ReactNode;
	className?: string;
	onScroll?: UIEventHandler<HTMLDivElement>;
}

export function ScrollArea({
	children,
	className = "",
	onScroll,
}: ScrollAreaProps) {
	const thumbStyle =
		"relative flex-1 rounded-[10px] bg-gray-400/75 dark:bg-gray-400/50 before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']";

	const barStyle =
		"flex touch-none select-none p-0.5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col";

	return (
		<RadixScrollArea.Root
			className={`mx-auto flex h-screen max-w-full scroll-pt-[65px] flex-col items-center overflow-hidden ${className}`}
		>
			<RadixScrollArea.Viewport
				className="relative flex min-h-screen max-w-screen"
				onScroll={onScroll}
			>
				{children}
			</RadixScrollArea.Viewport>
			<RadixScrollArea.Scrollbar className={barStyle} orientation="vertical">
				<RadixScrollArea.Thumb className={thumbStyle} />
			</RadixScrollArea.Scrollbar>
			<RadixScrollArea.Scrollbar className={barStyle} orientation="horizontal">
				<RadixScrollArea.Thumb className={thumbStyle} />
			</RadixScrollArea.Scrollbar>
			<RadixScrollArea.Corner className="bg-black" />
		</RadixScrollArea.Root>
	);
}
