// From https://github.com/gaearon/overreacted.io/pull/797/files

"use client";

import { PropsWithChildren, useEffect } from "react";
import { useRouter } from "next/navigation";

let AutoRefresh: React.FC<PropsWithChildren>;

if (process.env.NODE_ENV === "development") {
	AutoRefresh = function AutoRefresh({ children }: PropsWithChildren) {
		const router = useRouter();
		useEffect(() => {
			const ws = new WebSocket("ws://localhost:3001");
			ws.onmessage = (event) => {
				if (event.data === "refresh") {
					router.refresh();
				}
			};
			return () => {
				ws.close();
			};
		}, [router]);
		return children;
	};
} else {
	AutoRefresh = function AutoRefresh({ children }: PropsWithChildren) {
		return children;
	};
}

export default AutoRefresh;
