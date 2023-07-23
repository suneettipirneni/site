import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useFilteredTags() {
	const params = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const setSelectedTags = (tags: string[]) => {
		if (tags.length === 0) {
			router.push(pathname);
			return;
		}

		router.push(`${pathname}?tags=${tags.join(",")}`);
	};

	const selectedTags = params.get("tags")?.split(",") ?? [];

	return [selectedTags, setSelectedTags] as const;
}
