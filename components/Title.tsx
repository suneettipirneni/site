export function Title({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h1 className={`${className} text-2xl lg:text-3xl font-bold text-left`}>
      {children}
    </h1>
  );
}
