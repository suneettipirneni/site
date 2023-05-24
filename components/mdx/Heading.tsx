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
  1: "text-3xl",
  2: "text-2xl",
  3: "text-xl",
  4: "text-lg",
  5: "text-md",
  6: "text-sm",
};

export function Heading({ level, className, ...props }: HeadingProps) {
  if (level > 6 || level < 1) {
    throw new Error(`Heading level ${level} is not supported.`);
  }

  const HeadingComponent =
    headingLevelMappings[level as keyof typeof headingLevelMappings];

  return (
    <HeadingComponent
      // @ts-expect-error
      className={`font-bold ${
        headingTextSizes[level as keyof typeof headingTextSizes]
      } ${className}`}
      {...props}
    />
  );
}
