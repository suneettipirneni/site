"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { HiPlay } from "react-icons/hi2";
import type { SandpackFiles } from "@codesandbox/sandpack-react";
import styles from "./ReactExample.module.css";

export type ReactExampleProps = {
	title?: string;
	files: SandpackFiles;
	template?: "react" | "react-ts";
	activeFile?: string;
	dependencies?: Record<string, string>;
	tailwind?: boolean;
};

const Playground = dynamic(() => import("./ReactPlayground"), {
	ssr: false,
	loading: () => (
		<div className={styles.loading} role="status">
			Loading example…
		</div>
	),
});

export function ReactExample({
	title = "React example",
	...props
}: ReactExampleProps) {
	const [started, setStarted] = useState(false);
	const entry =
		props.activeFile ??
		Object.keys(props.files).find(
			(path) =>
				typeof props.files[path] === "string" || !props.files[path].hidden,
		);
	const file = entry ? props.files[entry] : undefined;
	const code = typeof file === "string" ? file : file?.code;
	return (
		<section
			className={styles.example}
			data-react-example
			data-not-typeset
			aria-label={title}
		>
			<div className={styles.heading}>
				<span className={styles.title}>{title}</span>
			</div>
			{started ? (
				<Playground {...props} />
			) : (
				<div className={styles.launch}>
					<div className={styles.sourceExcerpt}>
						<div className={styles.panelHeading}>
							{entry?.replace(/^\//, "")}
						</div>
						<pre>
							<code>{code}</code>
						</pre>
					</div>
					<div className={styles.previewPanel}>
						<div className={styles.panelHeading}>
							<span className={styles.previewLabel}>Preview</span>
						</div>
						<div className={styles.launchAction}>
							<p>Edit the source. See the result here.</p>
							<button
								className={styles.runButton}
								type="button"
								onClick={() => setStarted(true)}
							>
								<HiPlay aria-hidden="true" />
								Run example
							</button>
						</div>
					</div>
				</div>
			)}
			<noscript>Enable JavaScript to run this example.</noscript>
		</section>
	);
}
