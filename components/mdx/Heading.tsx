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
  1: "text-3xl post:mt-8 post:pt-10 post:mb-7 post:font-bold post:border-t post:border-gray-400/30 post:dark:border-gray-600/50",
  2: "text-2xl post:mb-6",
  3: "text-xl post:mb-5",
  4: "text-lg post:mb-4",
  5: "text-md post:mb-4",
  6: "text-sm post:mb-4",
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
    <HeadingComponent
      className={`flex flex-row group font-bold gap-x-2 ${
        headingTextSizes[level as keyof typeof headingTextSizes]
      } ${className ?? ""}`}
      {...props}
    >
      {children}
    </HeadingComponent>
  );
}
