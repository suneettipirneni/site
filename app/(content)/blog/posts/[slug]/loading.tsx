export default function LoadingPost() {
	return (
		<article
			className="site-post-grid"
			aria-label="Loading post"
			aria-busy="true"
		>
			<div className="post-reading" aria-hidden="true">
				<header className="post-header">
					<div className="h-5 w-24 bg-muted" />
					<div className="mt-8 h-10 w-3/4 bg-muted sm:h-14" />
					<div className="mt-5 h-6 w-full bg-muted" />
					<div className="mt-2 h-6 w-2/3 bg-muted" />
					<div className="mt-6 h-4 w-3/4 bg-muted" />
					<div className="mt-3 h-4 w-16 bg-muted" />
					<div className="mt-8 aspect-[2/1] w-full rounded bg-muted sm:mt-10" />
				</header>
				<div className="space-y-3">
					<div className="h-4 w-full bg-muted" />
					<div className="h-4 w-11/12 bg-muted" />
					<div className="h-4 w-4/5 bg-muted" />
				</div>
			</div>
			<aside className="post-outline-rail" aria-hidden="true">
				<div className="h-3 w-20 bg-muted" />
				<div className="mt-6 h-3 w-28 bg-muted" />
				<div className="mt-5 h-3 w-24 bg-muted" />
			</aside>
		</article>
	);
}
