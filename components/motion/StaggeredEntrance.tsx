"use client";

import {
	m,
	stagger,
	useAnimationControls,
	useReducedMotion,
	type Variants,
} from "motion/react";
import { type PropsWithChildren, useLayoutEffect } from "react";

const itemVariants: Variants = {
	hidden: {
		opacity: 0,
		transform: "translateY(12px)",
	},
	visible: {
		opacity: 1,
		transform: "translateY(0px)",
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1],
		},
	},
};

interface StaggeredEntranceProps extends PropsWithChildren {
	className?: string;
	delay?: number;
}

export function StaggeredEntrance({
	children,
	className,
	delay = 0,
}: StaggeredEntranceProps) {
	const shouldReduceMotion = useReducedMotion();
	const controls = useAnimationControls();
	const containerVariants: Variants = {
		hidden: {},
		visible: {
			transition: {
				delayChildren: stagger(0.04, { startDelay: delay }),
			},
		},
	};

	useLayoutEffect(() => {
		if (shouldReduceMotion) {
			controls.set("visible");
			return;
		}

		controls.set("hidden");
		const frame = requestAnimationFrame(() => {
			void controls.start("visible");
		});

		return () => cancelAnimationFrame(frame);
	}, [controls, delay, shouldReduceMotion]);

	return (
		<m.div
			className={className}
			variants={containerVariants}
			initial={false}
			animate={controls}
		>
			{children}
		</m.div>
	);
}

export function EntranceItem({
	children,
	className,
}: PropsWithChildren<{ className?: string }>) {
	return (
		<m.div className={className} variants={itemVariants}>
			{children}
		</m.div>
	);
}
