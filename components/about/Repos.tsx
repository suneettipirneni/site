import { GH_USERNAME } from "@/lib/constants";
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
		<article className="flex min-h-[5.5rem] min-w-0 flex-col gap-1 py-3">
			<div className="type-body-small min-w-0 font-medium tracking-tight">
				<a
					href={repo.url}
					target="_blank"
					rel="noopener noreferrer"
					className="break-words underline-offset-4 hover:underline"
				>
					{repo.name}
				</a>
			</div>
			<p className="type-body-small line-clamp-2 text-muted-foreground">
				{repo.description ?? "Open-source work and experiments."}
			</p>
			<div className="type-caption flex flex-wrap items-center gap-x-4 gap-y-1 tabular-nums text-muted-foreground">
				<span>{repo.primaryLanguage?.name ?? "Code"}</span>
				<span
					className="inline-flex items-center gap-1"
					aria-label={`${formatNumber(repo.stargazerCount)} stars`}
				>
					<FaRegStar className="h-4 w-4 shrink-0" aria-hidden="true" />
					{formatNumber(repo.stargazerCount)}
				</span>
				<span
					className="inline-flex items-center gap-1"
					aria-label={`${formatNumber(repo.forkCount)} forks`}
				>
					<VscRepoForked className="h-4 w-4 shrink-0" aria-hidden="true" />
					{formatNumber(repo.forkCount)}
				</span>
			</div>
		</article>
	);
}

export async function Repos() {
	"use cache";
	cacheLife("hours");

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
		<StaggeredEntrance className="flex flex-col pt-2">
			{repos.map((repo) => (
				<EntranceItem key={repo.name}>
					<RepoRow repo={repo} />
				</EntranceItem>
			))}
		</StaggeredEntrance>
	);
}
