import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const session =
	process.env.BLOG_BROWSER_SESSION ??
	`blog-verify-${createHash("sha256").update(root).digest("hex").slice(0, 12)}`;
const baseUrl = process.env.BLOG_BASE_URL ?? "http://localhost:3000";
const reportPath =
	process.env.BLOG_REPORT_PATH ?? "/tmp/blog-design/browser-report.json";
const slugs = readdirSync(resolve(root, "posts"))
	.filter((file) => file.endsWith(".mdx"))
	.map((file) => file.slice(0, -4));
const publishedPosts = slugs
	.map(
		(slug) =>
			matter(readFileSync(resolve(root, "posts", `${slug}.mdx`), "utf8")).data,
	)
	.filter((post) => !post.draft);
const publishedTitles = publishedPosts.map((post) => post.title).sort();
const rustTitles = publishedPosts
	.filter((post) => post.tags.includes("rust"))
	.map((post) => post.title)
	.sort();
const results = [];

function browser(args, input) {
	const run = spawnSync(
		"agent-browser",
		["--session", session, "--json", ...args],
		{
			input,
			encoding: "utf8",
			timeout: 60_000,
			maxBuffer: 8 * 1024 * 1024,
		},
	);
	if (run.error) throw run.error;
	let response;
	try {
		response = JSON.parse(run.stdout);
	} catch {
		throw new Error(
			`agent-browser ${args.join(" ")} returned invalid JSON: ${run.stderr || run.stdout}`,
		);
	}
	assert(
		run.status === 0 && response.success,
		`${args.join(" ")}: ${JSON.stringify(response.error ?? run.stderr)}`,
	);
	return response.data;
}

function evaluate(fn) {
	return browser(["eval", "--stdin"], `(${fn.toString()})()`).result;
}

function inspectArticle() {
	const post = document.querySelector("[data-post]");
	if (!post) return { missingArticle: true };
	const visible = (element) => element.getClientRects().length > 0;
	const box = (element) => {
		const rect = element.getBoundingClientRect();
		return {
			left: rect.left,
			right: rect.right,
			width: rect.width,
			height: rect.height,
		};
	};
	const invalidAnchors = [
		...document.querySelectorAll("aside a[href^='#'], nav a[href^='#']"),
	]
		.filter(
			(link) =>
				link.hash.length > 1 &&
				!document.getElementById(decodeURIComponent(link.hash.slice(1))),
		)
		.map((link) => link.hash);
	const images = [...post.querySelectorAll("img")]
		.filter(visible)
		.map((image) => ({
			...box(image),
			declaredWidth: Number(image.getAttribute("width")),
			alt: image.alt,
		}));
	const tables = [...post.querySelectorAll("table")]
		.filter(visible)
		.map((table) => ({
			display: getComputedStyle(table).display,
			role: table.getAttribute("role"),
			cells: [...table.querySelectorAll("th,td")].map((cell) => {
				const style = getComputedStyle(cell);
				return {
					horizontalPadding:
						parseFloat(style.paddingLeft) + parseFloat(style.paddingRight),
					verticalPadding:
						parseFloat(style.paddingTop) + parseFloat(style.paddingBottom),
				};
			}),
		}));
	const codeBlocks = [...post.querySelectorAll("pre")].filter(visible).map(box);
	const captions = [...post.querySelectorAll("figcaption")]
		.filter(visible)
		.map((caption) => ({
			...box(caption),
			scrollHeight: caption.scrollHeight,
			clientHeight: caption.clientHeight,
		}));
	const highlights = [
		...post.querySelectorAll("[data-highlighted-line], .line--highlighted"),
	]
		.filter(visible)
		.map((line) => ({
			background: getComputedStyle(line).backgroundColor,
			shadow: getComputedStyle(line).boxShadow,
			border: getComputedStyle(line).borderLeftWidth,
		}));
	return {
		missingArticle: false,
		viewport: document.documentElement.clientWidth,
		documentWidth: document.documentElement.scrollWidth,
		h1Count: document.querySelectorAll("main h1").length,
		column: box(post),
		invalidAnchors,
		images,
		tables,
		codeBlocks,
		captions,
		highlights,
		quoteCount: post.querySelectorAll("blockquote[cite]").length,
		detailsCount: post.querySelectorAll("details").length,
	};
}

function checkMetrics(metrics, label, gallery) {
	const check = (condition, name) => assert(condition, `${label}: ${name}`);
	check(!metrics.missingArticle, "article rendered");
	check(
		metrics.documentWidth <= metrics.viewport + 1,
		"document has no horizontal overflow",
	);
	check(metrics.h1Count === 1, `one page h1, found ${metrics.h1Count}`);
	check(
		metrics.invalidAnchors.length === 0,
		`outline targets exist: ${metrics.invalidAnchors.join(", ")}`,
	);
	check(
		metrics.column.width <= 705,
		`reading column <= 704px, got ${metrics.column.width}`,
	);
	check(
		metrics.column.width >= Math.min(400, metrics.viewport - 80),
		`reading column is usable, got ${metrics.column.width}`,
	);
	check(
		metrics.images.every(
			(image) =>
				image.declaredWidth > 0 && image.width <= image.declaredWidth + 1,
		),
		"images do not exceed declared natural width",
	);
	check(
		metrics.tables.every(
			(table) =>
				table.display === "table" &&
				(!table.role || table.role === "table") &&
				table.cells.length > 0 &&
				table.cells.every(
					(cell) => cell.horizontalPadding > 0 && cell.verticalPadding > 0,
				),
		),
		"tables retain semantics and padded cells",
	);
	check(
		metrics.codeBlocks.every(
			(block) =>
				block.left >= metrics.column.left - 1 &&
				block.right <= metrics.column.right + 1,
		),
		"code blocks remain inside article column",
	);
	check(
		metrics.captions.every(
			(caption) =>
				caption.scrollHeight <= caption.clientHeight + 1 &&
				caption.left >= -1 &&
				caption.right <= metrics.viewport + 1,
		),
		"captions wrap without clipping",
	);
	if (gallery) {
		check(
			metrics.tables.length >= 2,
			"gallery includes direct and figure tables",
		);
		check(
			metrics.quoteCount > 0,
			"gallery includes an attributed source quote",
		);
		check(
			metrics.highlights.length > 0 &&
				metrics.highlights.every(
					(line) =>
						!["transparent", "rgba(0, 0, 0, 0)"].includes(line.background),
				),
			"highlighted code lines have visible backgrounds",
		);
	}
}

function verify(slug, width, theme) {
	const label = `${slug} ${width}px ${theme}`;
	const result = { label, status: "running" };
	results.push(result);
	browser(["set", "viewport", String(width), "1000"]);
	browser(["set", "media", theme, "reduced-motion"]);
	browser(["open", new URL(`/blog/posts/${slug}`, baseUrl).href]);
	browser(["wait", "[data-post]"]);
	browser(["eval", "--stdin"], "document.fonts.ready.then(() => true)");
	const gallery = slug === "tour-of-components";
	const closed = evaluate(inspectArticle);
	result.closed = closed;
	checkMetrics(closed, label, gallery);
	if (gallery) {
		assert(closed.detailsCount > 0, `${label}: native callout details exists`);
		evaluate(() => {
			document.querySelector("[data-post] details > summary").focus();
			return true;
		});
		const before = evaluate(() => document.activeElement?.parentElement?.open);
		browser(["press", "Enter"]);
		const after = evaluate(() => document.activeElement?.parentElement?.open);
		assert(
			typeof before === "boolean" && after === !before,
			`${label}: Enter toggles focused disclosure`,
		);
	}
	evaluate(() => {
		document.querySelectorAll("[data-post] details").forEach((detail) => {
			detail.open = true;
		});
		return true;
	});
	const expanded = evaluate(inspectArticle);
	result.expanded = expanded;
	checkMetrics(expanded, `${label} expanded`, gallery);
	result.status = "passed";
	console.log(
		`PASS ${label}: columns, headings, links, images, tables, code, captions${gallery ? ", highlights, quote, keyboard disclosure" : ""}`,
	);
}

function inspectIndex() {
	return {
		titles: [
			...document.querySelectorAll('section[aria-label="Posts"] article h3 a'),
		]
			.map((link) => link.textContent.trim())
			.sort(),
		overflow:
			document.documentElement.scrollWidth >
			document.documentElement.clientWidth + 1,
		emptyState: document
			.querySelector('section[aria-label="Posts"]')
			?.textContent.includes("No posts in this category yet."),
	};
}

function checkIndex(result, step, expected) {
	browser([
		"wait",
		"--fn",
		`document.querySelector('section[aria-label="Posts"]') && !document.querySelector('[aria-label="Loading posts"]')`,
	]);
	const metrics = evaluate(inspectIndex);
	result[step] = metrics;
	assert.deepEqual(
		metrics.titles,
		expected,
		`${result.label} ${step}: exact published title set`,
	);
	assert(!metrics.overflow, `${result.label} ${step}: no document overflow`);
	if (!expected.length)
		assert(metrics.emptyState, `${result.label}: readable empty state`);
}

function clickIndexFilter(tag) {
	const selected = browser(
		["eval", "--stdin"],
		`(() => {
  document.querySelectorAll("[data-browser-filter]").forEach((element) => element.removeAttribute("data-browser-filter"));
  const candidates = [...document.querySelectorAll('nav[aria-label="Filter posts"] a')];
  const link = candidates.find((candidate) => {
   const url = new URL(candidate.href);
   return (url.searchParams.get('tags') ?? '') === ${JSON.stringify(tag)} && candidate.getClientRects().length > 0;
  });
  if (!link) throw new Error('Visible filter link not found');
  link.setAttribute('data-browser-filter', 'target');
  return true;
 })()`,
	).result;
	assert(selected, "filter link selected");
	browser(["snapshot", "-i"]);
	browser(["click", '[data-browser-filter="target"]']);
	browser([
		"wait",
		"--fn",
		`new URL(location.href).searchParams.get('tags') === ${JSON.stringify(tag || null)}`,
	]);
}

function openMobileTopics() {
	const needsOpening = evaluate(() => {
		const details = [...document.querySelectorAll("main details")].find(
			(element) =>
				element.querySelector('nav[aria-label="Filter posts"]') &&
				element.getClientRects().length > 0,
		);
		if (!details || details.open) return false;
		details.querySelector("summary").focus();
		return true;
	});
	if (needsOpening) browser(["press", "Enter"]);
}

function verifyIndex(width) {
	const result = { label: `blog index ${width}px`, status: "running" };
	results.push(result);
	browser(["set", "viewport", String(width), "1000"]);
	browser(["set", "media", "light", "reduced-motion"]);
	browser(["open", new URL("/blog", baseUrl).href]);
	checkIndex(result, "all", publishedTitles);
	openMobileTopics();
	clickIndexFilter("rust");
	checkIndex(result, "clickedRust", rustTitles);
	openMobileTopics();
	clickIndexFilter("");
	checkIndex(result, "cleared", publishedTitles);
	browser(["open", new URL("/blog?tags=rust", baseUrl).href]);
	checkIndex(result, "directRust", rustTitles);
	browser(["open", new URL("/blog?tags=__no_such_blog_topic__", baseUrl).href]);
	checkIndex(result, "empty", []);
	result.status = "passed";
	console.log(
		`PASS ${result.label}: published cards, clicked and direct Rust filters, clear, empty state`,
	);
}

function verifyAccessibility(path, width, theme) {
	const result = {
		label: `accessibility ${path} ${width}px ${theme}`,
		status: "running",
	};
	results.push(result);
	browser(["set", "viewport", String(width), "1000"]);
	browser(["set", "media", theme, "reduced-motion"]);
	browser(["open", new URL(path, baseUrl).href]);
	browser([
		"wait",
		path === "/blog" ? 'section[aria-label="Posts"] article' : "[data-post]",
	]);
	browser(["eval", "--stdin"], "document.fonts.ready.then(() => true)");
	evaluate(() => {
		document.querySelectorAll("main details").forEach((details) => {
			details.open = true;
		});
		return true;
	});
	result.fullAudit = browser(["a11y", "--selector", "main"]);
	result.wcagAudit = browser([
		"a11y",
		"--selector",
		"main",
		"--tags",
		"wcag2a,wcag2aa",
	]);
	assert(
		Array.isArray(result.wcagAudit.violations),
		`${result.label}: audit returned violations array`,
	);
	assert.equal(
		result.wcagAudit.violations.length,
		0,
		`${result.label}: ${JSON.stringify(result.wcagAudit.violations)}`,
	);
	result.status = "passed";
	console.log(
		`PASS ${result.label}: no WCAG 2 A/AA violations; full audit records ${result.fullAudit.violations?.length ?? "unknown"} findings`,
	);
}

let failure;
try {
	console.log(
		"Verifying published-only index. Run against a production build with next start.",
	);
	for (const slug of slugs) {
		for (const width of [1440, 390]) verify(slug, width, "light");
	}
	for (const width of [320, 768, 1024, 1280, 1440, 390]) {
		for (const theme of ["light", "dark"])
			verify("tour-of-components", width, theme);
	}
	for (const width of [1440, 390]) verifyIndex(width);
	for (const width of [1440, 390]) {
		for (const theme of ["light", "dark"]) {
			verifyAccessibility("/blog/posts/tour-of-components", width, theme);
			verifyAccessibility("/blog", width, theme);
		}
	}
} catch (error) {
	failure = error;
	const result = results.at(-1);
	if (result?.status === "running") {
		result.status = "failed";
		result.failure = error.message;
	}
} finally {
	mkdirSync(dirname(reportPath), { recursive: true });
	writeFileSync(
		reportPath,
		`${JSON.stringify({ baseUrl, session, timestamp: new Date().toISOString(), status: failure ? "failed" : "passed", failure: failure?.message, results }, null, 2)}\n`,
	);
	console.log(`Report ${reportPath}`);
}
if (failure) throw failure;
