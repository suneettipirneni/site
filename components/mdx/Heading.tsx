export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
	level: number;
	className?: string;
}

const headingLevelMappings = {
	1: "h1",
	2: "h2",
	3: "h3",
	4: "h4",
	5: "h5",
	6: "h6",
};

const headingTextSizes = {
	1: "text-2xl post:mt-8 post:pt-7 post:mb-5 post:font-semibold post:border-t post:border-gray-400/30 post:dark:border-gray-600/50",
	2: "text-xl post:mb-6 font-semibold post:mb-3 post:pt-5",
	3: "text-lg post:mb-5 font-semibold post:mb-1 post:pt-3",
	4: "text-md post:mb-4 font-semibold post:mb-1 post:pt-2",
	5: "text-md post:mb-4 font-semibold post:mb-1 post:pt-2",
	6: "post:mb-4 font-semibold post:mb-1 post:pt-2",
};

export function Heading({
	level,
	className,
	children,
	...props
}: HeadingProps) {
	if (level > 6 || level < 1) {
		throw new Error(`Heading level ${level} is not supported.`);
	}

	const HeadingComponent =
		headingLevelMappings[level as keyof typeof headingLevelMappings];

	return (
        // @ts-expect-error
        (<HeadingComponent
			className={`group flex scroll-mt-nav flex-row gap-x-2 ${
				headingTextSizes[level as keyof typeof headingTextSizes]
			} ${className ?? ""}`}
			{...props}
		>
            {children}
        </HeadingComponent>)
    );
}
