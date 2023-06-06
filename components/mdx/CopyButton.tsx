"use client";

import { useState, useCallback, useEffect } from "react";
import { MdContentCopy, MdOutlineCheck } from "react-icons/md";

export function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false);

	const copy = useCallback(() => {
		navigator.clipboard.writeText(text);
		setCopied(true);
	}, [text]);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => {
				setCopied(false);
			}, 2000);

			return () => {
				clearTimeout(timeout);
			};
		}
	}, [copied]);

	return (
		<button
			onClick={copy}
			title="Copy to clipboard"
			className={` rounded-sm text-sm text-gray-600 dark:text-gray-400`}
		>
			{copied ? <MdOutlineCheck size={18} /> : <MdContentCopy size={18} />}
		</button>
	);
}
