export function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`${className} text-2xl sm:text-5xl font-bold text-left`}>
      {children}
    </h1>
  );
}
