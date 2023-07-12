import { Button } from "./Button";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

export function ProfileFooter() {
	return (
		<div className="flex flex-row space-x-3">
			<Button
				title="GitHub"
				icon={<AiFillGithub size={24} />}
				as="a"
				className="transition-all hover:scale-110 hover:bg-black hover:text-white"
				href="https://github.com/suneettipirneni"
			/>
			<Button
				title="Discord"
				icon={<BsDiscord size={24} />}
				as="a"
				className="transition-all hover:scale-110 hover:bg-blurple hover:text-white"
				href="https://discordapp.com/users/386337006764032002"
			/>
		</div>
	);
}
