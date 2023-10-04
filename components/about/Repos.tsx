import { GH_REPO_REVALIDATE_TIME, GH_USERNAME } from "@/util/constants";
import { FaStar } from "react-icons/fa";
import { BiGitRepoForked } from "react-icons/bi";
import Image from "next/image";

const url = "https://api.github.com/graphql";

const body = {
	query: `
  {
    user(login: "${GH_USERNAME}") {
      pinnedItems(first: 6, types: REPOSITORY) {
        nodes {
          ... on Repository {
            name
            stargazerCount
            forkCount
            description
            url
						primaryLanguage {
							name
							color
						}
            owner {
              avatarUrl
            }
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
				nodes: {
					name: string;
					stargazerCount: number;
					forkCount: number;
					description: string;
					url: string;
					primaryLanguage: {
						name: string;
						color: string;
					};
					owner: {
						avatarUrl: string;
					};
				}[];
			};
		};
	};
}

function formatNumber(num: number) {
	if (Math.abs(num) >= 1000) {
		let formatter = new Intl.NumberFormat(undefined, {
			minimumFractionDigits: 1,
			maximumFractionDigits: 1,
		});
		return formatter.format(num / 1000) + "K";
	} else {
		return num.toString();
	}
}

type Repo = ResponseData["data"]["user"]["pinnedItems"]["nodes"][number];

export function Repo({ repo }: { repo: Repo }) {
	return (
		<div className="flex w-full flex-col gap-x-3 gap-y-2 rounded-xl bg-gray-200/60 p-2 dark:bg-white/10 md:min-h-[100px] md:p-4">
			<a
				href={repo.url}
				className="flex items-center gap-x-2 font-semibold hover:underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				<Image
					src={repo.owner.avatarUrl}
					alt=""
					height={20}
					width={20}
					className="rounded-full"
				/>
				{repo.name}
			</a>
			<p className="line-clamp-2 text-xs text-gray-600 dark:text-white/50 md:block">
				{repo.description}
			</p>

			<div className="flex w-full grow flex-row items-center gap-x-2">
				<p className="flex items-center gap-x-1 text-sm text-gray-600 dark:text-white/50">
					<FaStar />
					{formatNumber(repo.stargazerCount)}
				</p>

				<p className="flex items-center gap-x-1 text-sm text-gray-600 dark:text-white/50">
					<BiGitRepoForked />
					{formatNumber(repo.forkCount)}
				</p>

				<div className="ml-auto flex items-center gap-x-1 text-xs text-gray-600 dark:text-white/50">
					<div
						className="h-[10px] w-[10px] rounded-full"
						style={{ backgroundColor: repo.primaryLanguage.color }}
					></div>
					{repo.primaryLanguage.name}
				</div>
			</div>
		</div>
	);
}

export async function Repos() {
	const repos = await fetch(url, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			Authorization: `Bearer ${process.env.GH_TOKEN}`,
			"Content-Type": "application/json",
		},
		next: {
			revalidate: GH_REPO_REVALIDATE_TIME,
		},
	})
		.then((res) => res.json() as Promise<ResponseData>)
		.then((res) => res.data.user.pinnedItems.nodes);

	return (
		<div className="grid w-full max-w-[600px] grid-cols-1 gap-2 md:grid-cols-2">
			{repos.map((repo) => (
				<Repo key={repo.name} repo={repo} />
			))}
		</div>
	);
}
