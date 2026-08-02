import { GH_REPO_REVALIDATE_TIME, GH_USERNAME } from "@/lib/constants";
import { cacheLife } from "next/cache";
import {
	EntranceItem,
	StaggeredEntrance,
} from "@/components/motion/StaggeredEntrance";
import { FaRegStar } from "react-icons/fa";
import { VscRepoForked } from "react-icons/vsc";

const url = "https://api.github.com/graphql";

const body = {
	query: `
  {
    user(login: "${GH_USERNAME}") {
      pinnedItems(first: 4, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            stargazerCount
            forkCount
            description
            url
            primaryLanguage { name }
          }
        }
      }
    }
  }
`,
};

interface ResponseData {
	data: {
		user: {
			pinnedItems: {
				nodes: Array<{
					name: string;
					stargazerCount: number;
					forkCount: number;
					description: string | null;
					url: string;
					primaryLanguage: { name: string } | null;
				}>;
			};
		};
	};
}

function formatNumber(value: number) {
	return new Intl.NumberFormat("en-US", {
		notation: value >= 1000 ? "compact" : "standard",
		maximumFractionDigits: 1,
	}).format(value);
}

type Repo = ResponseData["data"]["user"]["pinnedItems"]["nodes"][number];

function RepoRow({ repo }: { repo: Repo }) {
	return (
		<article className="flex min-h-[var(--site-row-lg)] flex-col justify-center py-3 sm:py-2">
			<div className="flex min-w-0 items-baseline justify-between gap-4">
				<a
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className="type-body-small min-w-0 truncate font-medium tracking-tight underline-offset-4 hover:underline"
				>
					{repo.name}
				</a>
				<div className="type-caption flex shrink-0 items-center gap-3 tabular-nums text-muted-foreground">
					<span
						className="inline-flex items-center gap-1"
						aria-label={`${formatNumber(repo.stargazerCount)} stars`}
					>
						<FaRegStar className="size-4 shrink-0" aria-hidden="true" />
						{formatNumber(repo.stargazerCount)}
					</span>
					<span
						className="inline-flex items-center gap-1"
						aria-label={`${formatNumber(repo.forkCount)} forks`}
					>
						<VscRepoForked className="size-4 shrink-0" aria-hidden="true" />
						{formatNumber(repo.forkCount)}
					</span>
				</div>
			</div>
			<div className="flex min-w-0 items-baseline justify-between gap-4">
				<p className="type-body-small line-clamp-1 min-w-0 text-muted-foreground">
					{repo.description ?? "Open-source work and experiments."}
				</p>
				<span className="type-caption shrink-0 text-muted-foreground">
					{repo.primaryLanguage?.name ?? "Code"}
				</span>
			</div>
		</article>
	);
}

export async function Repos() {
	"use cache";
	cacheLife({
		stale: GH_REPO_REVALIDATE_TIME,
		revalidate: GH_REPO_REVALIDATE_TIME,
		expire: GH_REPO_REVALIDATE_TIME * 24,
	});

	const response = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			Authorization: `Bearer ${process.env.GH_TOKEN}`,
			"Content-Type": "application/json",
		},
	});

	if (!response.ok) {
		throw new Error(`GitHub request failed with status ${response.status}`);
	}

	const payload = (await response.json()) as ResponseData;
	const repos = payload.data.user.pinnedItems.nodes;

	return (
		<StaggeredEntrance className="mt-2 flex flex-col sm:mt-3">
			{repos.map((repo) => (
				<EntranceItem key={repo.name}>
					<RepoRow repo={repo} />
				</EntranceItem>
			))}
		</StaggeredEntrance>
	);
}
