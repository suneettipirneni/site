import { Button } from "./Button";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord, BsLinkedin } from "react-icons/bs";

export function ProfileFooter() {
	return (
		<div className="grid grid-flow-dense grid-cols-2 gap-3">
			<Button
				title="GitHub"
				icon={<AiFillGithub size={24} />}
				as="a"
				className="transition-all hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
				href="https://github.com/suneettipirneni"
				target="_blank"
				rel="noopener noreferrer"
			/>
			<Button
				title="Discord"
				icon={<BsDiscord size={24} />}
				as="a"
				className="transition-all hover:scale-110 hover:bg-blurple hover:text-white"
				href="https://discordapp.com/users/386337006764032002"
				target="_blank"
				rel="noopener noreferrer"
			/>
			<div className="col-span-2 flex flex-row items-center justify-center align-middle">
				<Button
					title="LinkedIn"
					icon={<BsLinkedin size={24} />}
					as="a"
					className="col-span-2 transition-all hover:scale-110 hover:bg-[#0077B5] hover:text-white"
					href="https://www.linkedin.com/in/suneettipirneni/"
					target="_blank"
					rel="noopener noreferrer"
				/>
			</div>
		</div>
	);
}
