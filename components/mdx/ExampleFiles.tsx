"use client";

import { HiChevronRight } from "react-icons/hi2";
import styles from "./ReactExample.module.css";

type FileNode = { name: string; path: string; children: Map<string, FileNode> };

export function ExampleFiles({
	paths,
	activeFile,
	onSelect,
}: {
	paths: string[];
	activeFile: string;
	onSelect: (path: string) => void;
}) {
	const root = new Map<string, FileNode>();
	for (const path of paths) {
		const parts = path.split("/").filter(Boolean);
		let children = root;
		for (let index = 0; index < parts.length; index++) {
			const name = parts[index];
			if (!children.has(name))
				children.set(name, {
					name,
					path: "/" + parts.slice(0, index + 1).join("/"),
					children: new Map(),
				});
			children = children.get(name)!.children;
		}
	}
	return (
		<nav className={styles.files} aria-label="Files">
			<FileLevel nodes={root} activeFile={activeFile} onSelect={onSelect} />
		</nav>
	);
}

function FileLevel({
	nodes,
	activeFile,
	onSelect,
}: {
	nodes: Map<string, FileNode>;
	activeFile: string;
	onSelect: (path: string) => void;
}) {
	const entries = [...nodes.values()].sort(
		(a, b) =>
			Number(b.children.size > 0) - Number(a.children.size > 0) ||
			a.name.localeCompare(b.name),
	);
	return (
		<ul className={styles.fileList}>
			{entries.map((node) => (
				<li key={node.path}>
					{node.children.size ? (
						<details className={styles.directory} open>
							<summary title={node.path}>
								<HiChevronRight aria-hidden="true" />
								<span>{node.name}</span>
							</summary>
							<FileLevel
								nodes={node.children}
								activeFile={activeFile}
								onSelect={onSelect}
							/>
						</details>
					) : (
						<button
							type="button"
							className={styles.fileRow}
							aria-current={activeFile === node.path ? "true" : undefined}
							title={node.path}
							onClick={() => onSelect(node.path)}
						>
							<span>{node.name}</span>
						</button>
					)}
				</li>
			))}
		</ul>
	);
}
