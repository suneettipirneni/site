import { BsDiscord, BsGithub, BsLinkedin } from "react-icons/bs";

export default function Footer() {
	return (
		<footer className="flex h-[70px] w-full items-center justify-center border-t border-gray-200 px-5 dark:border-gray-200/5 xl:px-0">
			<div className="flex w-full max-w-[850px] items-center justify-between text-sm text-gray-500 dark:text-gray-400">
				<div className="flex flex-row">
					<h1>
						Suneet Tipirneni &mdash;{" "}
						<a
							className="cursor-pointer font-mono font-bold hover:underline"
							href="https://github.com/suneettipirneni/site"
							target="_blank"
							rel="noopener noreferrer"
						>
							Source
						</a>
					</h1>
				</div>
				<div className="flex flex-row space-x-2 text-lg">
					<a
						className="cursor-pointer"
						href="https://discordapp.com/users/386337006764032002"
						target="_blank"
						rel="noopener noreferrer"
						title="Discord Profile"
					>
						<BsDiscord />
					</a>
					<a
						className="cursor-pointer"
						href="https://github.com/suneettipirneni"
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub Profile"
					>
						<BsGithub />
					</a>
					<a
						className="cursor-pointer"
						href="https://www.linkedin.com/in/suneettipirneni/"
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn Profile"
					>
						<BsLinkedin />
					</a>
				</div>
			</div>
		</footer>
	);
}
