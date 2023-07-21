export interface QuoteProps {
  children?: React.ReactNode;
  source?: string;
}

export function Quote({ children, source }: QuoteProps) {
  return (
    <div className="flex items-center align-middle  text-lg md:text-xl font-medium leading-snug post:my-10 md:px-10 px-5">
      <div className='flex flex-col space-y-4 pl-4 border-l-4 border-black/50 dark:border-white/50 py-3 max-w-[45ch]'>
      {children}
      </div>
    </div>
  );
}