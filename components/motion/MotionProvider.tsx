"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { PropsWithChildren } from "react";

export function MotionProvider({ children }: PropsWithChildren) {
	return (
		<LazyMotion features={domAnimation} strict>
			<MotionConfig reducedMotion="user">{children}</MotionConfig>
		</LazyMotion>
	);
}
