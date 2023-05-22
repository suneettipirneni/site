"use client";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Profile } from "@/components/Profile";
import { Subtitle } from "@/components/Subtitle";
import { AiFillGithub } from "react-icons/ai";
import { BsDiscord } from "react-icons/bs";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-10">
      <Profile />
      <Heading className="max-w-[600px] line-clamp-3 text-center">
        <Balancer>{"Hello! I'm Suneet and this is a website"}</Balancer>
      </Heading>
      <Subtitle className="max-w-[450px] text-center text-slate-500 dark:text-slate-500">
        <Balancer>
          {
            "I'm an amateur developer from Orlando, Florida working on anything that seems nifty."
          }
        </Balancer>
      </Subtitle>
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
    </div>
  );
}
