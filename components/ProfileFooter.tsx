"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";

const hoverVariants = {
	github: {
		scale: 1.1,
		backgroundColor: "black",
		color: "white",
	},

	discord: {
		scale: 1.1,
		backgroundColor: "#5865F2",
		color: "white",
	},
};

export function ProfileFooter() {
	return (
		<div className="flex flex-row space-x-3">
			<Button
				initial={false}
				title="GitHub"
				icon={<AiFillGithub size={24} />}
				whileHover="github"
				as={motion.a}
				variants={hoverVariants}
				href="https://github.com/suneettipirneni"
			/>
			<Button
				initial={false}
				title="Discord"
				icon={<BsDiscord size={24} />}
				whileHover="discord"
				as={motion.a}
				variants={hoverVariants}
				href="https://discordapp.com/users/386337006764032002"
			/>
		</div>
	);
}
