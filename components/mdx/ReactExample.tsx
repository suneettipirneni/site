"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useRef, useState } from "react";
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
	const sectionRef = useRef<HTMLElement>(null);
	const latestFiles = useRef<SandpackFiles | undefined>(undefined);
	const [resumeFiles, setResumeFiles] = useState<SandpackFiles>();
	const captureFiles = useCallback((files: SandpackFiles) => {
		latestFiles.current = files;
	}, []);
	useEffect(() => {
		const section = sectionRef.current;
		if (!section || !("IntersectionObserver" in window)) return;
		let idleTimer: ReturnType<typeof setTimeout> | undefined;
		const observer = new IntersectionObserver((entries) => {
			const entry = entries[entries.length - 1];
			if (!entry) return;
			clearTimeout(idleTimer);
			if (entry.isIntersecting && entry.intersectionRatio > 0) {
				setStarted(true);
			} else if (started) {
				idleTimer = setTimeout(() => {
					setResumeFiles(latestFiles.current);
					setStarted(false);
				}, 180_000);
			}
		});
		observer.observe(section);
		return () => {
			observer.disconnect();
			clearTimeout(idleTimer);
		};
	}, [started]);
	const entry =
		props.activeFile ??
		Object.keys(props.files).find(
			(path) =>
				typeof props.files[path] === "string" || !props.files[path].hidden,
		);
	const file = entry ? (resumeFiles ?? props.files)[entry] : undefined;
	const code = typeof file === "string" ? file : file?.code;
	return (
		<section
			ref={sectionRef}
			className={styles.example}
			data-react-example
			data-not-typeset
			aria-label={title}
		>
			<div className={styles.heading}>
				<span className={styles.title}>{title}</span>
			</div>
			{started ? (
				<Playground
					{...props}
					resumeFiles={resumeFiles}
					onFilesChange={captureFiles}
				/>
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
