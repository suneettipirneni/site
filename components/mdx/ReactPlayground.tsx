"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
	HiOutlineArrowPath,
	HiChevronRight,
	HiOutlineTrash,
	HiOutlineArrowUturnLeft,
	HiOutlineFolder,
	HiOutlineArrowsPointingOut,
	HiOutlineArrowsPointingIn,
} from "react-icons/hi2";
import {
	SandpackProvider,
	SandpackConsole,
	SandpackLayout,
	SandpackCodeEditor,
	SandpackPreview,
	useSandpack,
} from "@codesandbox/sandpack-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import type { ReactExampleProps } from "./ReactExample";
import styles from "./ReactExample.module.css";
import { ExampleFiles } from "./ExampleFiles";

const compactQuery = "(max-width: 760px)";
function subscribeToViewport(onChange: () => void) {
	const media = window.matchMedia(compactQuery);
	media.addEventListener("change", onChange);
	return () => media.removeEventListener("change", onChange);
}
function isCompactViewport() {
	return window.matchMedia(compactQuery).matches;
}
function serverViewport() {
	return false;
}

function ExampleConsole() {
	const consoleRef = useRef<{ reset: () => void }>(null);
	return (
		<div className={styles.consoleDisclosure}>
			<details className={styles.consoleDetails}>
				<summary>
					<HiChevronRight aria-hidden="true" />
					Console
				</summary>
				<div className={styles.consoleBody}>
					<SandpackConsole
						ref={consoleRef}
						className={styles.console}
						showHeader={false}
						showResetConsoleButton={false}
						showRestartButton={false}
						showSyntaxError
						maxMessageCount={200}
						resetOnPreviewRestart
					/>
				</div>
			</details>
			<button
				className={styles.clearConsole}
				type="button"
				aria-label="Clear console"
				title="Clear console"
				onClick={() => consoleRef.current?.reset()}
			>
				<HiOutlineTrash aria-hidden="true" />
			</button>
		</div>
	);
}

function Workspace({ onReset }: { onReset: () => void }) {
	const { sandpack, dispatch } = useSandpack();
	const compact = useSyncExternalStore(
		subscribeToViewport,
		isCompactViewport,
		serverViewport,
	);
	const [filesOpen, setFilesOpen] = useState(false);
	const filesToggle = useRef<HTMLButtonElement>(null);
	function closeFiles() {
		setFilesOpen(false);
		filesToggle.current?.focus({ preventScroll: true });
	}
	const [expanded, setExpanded] = useState(false);
	const changed = sandpack.editorState === "dirty";
	const tabList = useRef<HTMLElement>(null);
	useEffect(() => {
		const list = tabList.current;
		const active = list?.querySelector<HTMLElement>('[aria-pressed="true"]');
		if (!list || !active) return;
		const delta =
			active.getBoundingClientRect().left - list.getBoundingClientRect().left;
		if (delta < 0) list.scrollLeft += delta;
		else if (delta + active.offsetWidth > list.clientWidth)
			list.scrollLeft += delta + active.offsetWidth - list.clientWidth;
	}, [sandpack.activeFile]);
	const previewStatus = sandpack.error
		? "Preview error — fix the code or reset to try again"
		: sandpack.status === "timeout"
			? "Connection timed out — refresh to retry"
			: sandpack.status === "running" || sandpack.status === "done"
				? "Live preview"
				: "Starting preview…";
	return (
		<div className={styles.workspace} data-expanded={expanded}>
			<div className={styles.workspaceToolbar}>
				<button
					className={styles.iconButton}
					type="button"
					ref={filesToggle}
					aria-label="Toggle files"
					aria-expanded={filesOpen}
					title={filesOpen ? "Hide files" : "Show files"}
					onClick={() => setFilesOpen(!filesOpen)}
				>
					<HiOutlineFolder aria-hidden="true" />
				</button>
				<nav
					ref={tabList}
					className={styles.fileTabs}
					aria-label="Example files"
					onKeyDown={(event) => {
						if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key))
							return;
						const buttons = Array.from(
							event.currentTarget.querySelectorAll<HTMLButtonElement>("button"),
						);
						const current = buttons.indexOf(event.target as HTMLButtonElement);
						if (current < 0) return;
						event.preventDefault();
						const index =
							event.key === "Home"
								? 0
								: event.key === "End"
									? buttons.length - 1
									: (current +
											(event.key === "ArrowRight" ? 1 : -1) +
											buttons.length) %
										buttons.length;
						buttons[index]?.focus();
						buttons[index]?.click();
					}}
				>
					{sandpack.visibleFiles.map((path) => (
						<button
							key={path}
							type="button"
							className={styles.fileTab}
							aria-pressed={path === sandpack.activeFile}
							title={path}
							aria-label={path.replace(/^\//, "")}
							onClick={() => sandpack.setActiveFile(path)}
						>
							{sandpack.visibleFiles.filter(
								(file) => file.split("/").at(-1) === path.split("/").at(-1),
							).length > 1
								? path.replace(/^\//, "")
								: path.split("/").at(-1)}
						</button>
					))}
				</nav>
				<div className={styles.actions}>
					<button
						className={styles.iconButton}
						aria-label="Reset code"
						title="Reset code"
						type="button"
						disabled={!changed}
						onClick={onReset}
					>
						<HiOutlineArrowUturnLeft aria-hidden="true" />
					</button>
					<button
						className={styles.iconButton}
						aria-label="Refresh"
						title="Refresh preview"
						type="button"
						onClick={() =>
							sandpack.status === "timeout"
								? void sandpack.runSandpack()
								: dispatch({ type: "refresh" })
						}
					>
						<HiOutlineArrowPath aria-hidden="true" />
					</button>
					<button
						className={styles.iconButton}
						type="button"
						aria-label={expanded ? "Collapse example" : "Expand example"}
						aria-pressed={expanded}
						title={expanded ? "Collapse example" : "Expand example"}
						onClick={() => setExpanded(!expanded)}
					>
						{expanded ? (
							<HiOutlineArrowsPointingIn aria-hidden="true" />
						) : (
							<HiOutlineArrowsPointingOut aria-hidden="true" />
						)}
					</button>
				</div>
			</div>
			<SandpackLayout className={styles.resizableFrame}>
				<Group
					className={styles.resizableLayout}
					orientation={compact ? "vertical" : "horizontal"}
				>
					<Panel
						className={styles.source}
						defaultSize="62.5%"
						minSize={compact ? 160 : 300}
					>
						<div className={styles.editorBody}>
							<Group orientation="horizontal" className={styles.editorGroup}>
								{filesOpen && (
									<Panel
										collapsible={!compact}
										collapsedSize={0}
										onResize={(size) => {
											if (!compact && size.inPixels === 0) closeFiles();
										}}
										minSize={compact ? 0 : 120}
										maxSize={compact ? 0 : "45%"}
										defaultSize={compact ? 0 : 152}
										disabled={compact}
										className={styles.filePanel}
										style={compact ? { overflow: "visible" } : undefined}
									>
										<div className={styles.fileRail}>
											<div className={styles.railHeading}>
												<span className={styles.railLabel}>Files</span>
											</div>
											<ExampleFiles
												paths={sandpack.visibleFiles}
												activeFile={sandpack.activeFile}
												onSelect={(path) => {
													sandpack.setActiveFile(path);
													if (compact) setFilesOpen(false);
												}}
											/>
										</div>
									</Panel>
								)}
								{filesOpen && !compact && (
									<Separator
										className={styles.resizeHandle}
										aria-label="Resize files and code"
										title="Drag to resize · Double-click to reset"
									/>
								)}
								<Panel minSize={compact ? 0 : 160}>
									<SandpackCodeEditor
										className={styles.editor}
										showTabs={false}
										showLineNumbers
										showInlineErrors
										wrapContent
									/>
								</Panel>
							</Group>
						</div>
					</Panel>
					<Separator
						className={styles.resizeHandle}
						aria-label="Resize code and preview"
						title="Drag to resize · Double-click to reset"
					/>
					<Panel className={styles.previewPanel} minSize={compact ? 140 : 240}>
						<div
							className={styles.previewStatus}
							role="status"
							data-error={Boolean(sandpack.error)}
						>
							{previewStatus}
						</div>
						<SandpackPreview
							className={styles.preview}
							showOpenInCodeSandbox={false}
							showRefreshButton={false}
						/>
					</Panel>
				</Group>
			</SandpackLayout>
			<ExampleConsole />
		</div>
	);
}

export default function ReactPlayground({
	files,
	template,
	activeFile,
	dependencies,
	tailwind = false,
}: ReactExampleProps) {
	// Remounting also clears failed workers and pending compilation messages.
	const [revision, setRevision] = useState(0);
	return (
		<SandpackProvider
			key={revision}
			template={
				template ??
				(Object.keys(files).some((path) => /\.tsx?$/.test(path))
					? "react-ts"
					: "react")
			}
			files={files}
			theme={{
				colors: {
					surface1: "var(--example-surface)",
					surface2: "var(--example-muted)",
					surface3: "var(--example-border)",
					clickable: "var(--example-secondary)",
					base: "var(--example-foreground)",
					disabled: "var(--example-secondary)",
					hover: "var(--example-foreground)",
					accent: "var(--example-accent)",
					warning: "var(--example-warning)",
					warningSurface: "var(--example-warning-surface)",
					error: "#dc2626",
					errorSurface: "#fff1f2",
				},
				syntax: {
					plain: "var(--example-foreground)",
					comment: "#7b8491",
					keyword: "var(--example-keyword)",
					tag: "var(--example-definition)",
					punctuation: "var(--example-secondary)",
					definition: "var(--example-definition)",
					property: "var(--example-definition)",
					static: "#b06c3d",
					string: "var(--example-string)",
				},
				font: {
					body: "var(--font-inter), system-ui, sans-serif",
					mono: "var(--font-code)",
					size: "13px",
					lineHeight: "20px",
				},
			}}
			customSetup={{ dependencies }}
			options={{
				externalResources: tailwind
					? ["https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"]
					: [],
				activeFile,
				visibleFiles: Object.keys(files).filter(
					(path) => typeof files[path] === "string" || !files[path].hidden,
				),
				recompileMode: "delayed",
				recompileDelay: 400,
			}}
		>
			<Workspace onReset={() => setRevision((value) => value + 1)} />
		</SandpackProvider>
	);
}
