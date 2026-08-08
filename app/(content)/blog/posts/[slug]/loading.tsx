export default function LoadingPost() {
	return (
		<article
			className="site-post-grid w-full"
			aria-label="Loading post"
			aria-busy="true"
		>
			<aside className="order-2 hidden p-[var(--site-panel)] lg:order-none lg:block">
				<div className="h-3 w-20 bg-muted" />
				<div className="mt-5 h-3 w-28 bg-muted" />
				<div className="mt-8 h-3 w-16 bg-muted" />
				<div className="mt-5 h-3 w-24 bg-muted" />
			</aside>

			<div className="order-1 min-w-0 lg:order-none">
				<header className="p-[var(--site-panel)]">
					<div className="mx-auto w-full max-w-[760px]">
						<div className="h-10 w-3/4 bg-muted sm:h-12" />
						<div className="mt-5 h-4 w-full max-w-[34rem] bg-muted" />
						<div className="mt-2 h-4 w-2/3 max-w-[24rem] bg-muted" />
						<div className="mt-8 aspect-[2/1] w-full bg-muted lg:aspect-[3/1]" />
					</div>
				</header>
				<div className="p-[var(--site-panel)]">
					<div className="mx-auto max-w-[760px] space-y-3">
						<div className="h-4 w-full bg-muted" />
						<div className="h-4 w-11/12 bg-muted" />
						<div className="h-4 w-4/5 bg-muted" />
					</div>
				</div>
			</div>

			<aside className="hidden p-[var(--site-panel)] lg:block">
				<div className="h-3 w-16 bg-muted" />
				<div className="mt-5 h-3 w-28 bg-muted" />
				<div className="mt-3 h-3 w-24 bg-muted" />
			</aside>
		</article>
	);
}
