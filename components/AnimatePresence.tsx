"use client";

import { PropsWithChildren } from "react";
import { AnimatePresence as FramerAnimatePresence } from "framer-motion";

export function AnimatePresence({ children }: PropsWithChildren) {
  return <FramerAnimatePresence>{children}</FramerAnimatePresence>;
}
