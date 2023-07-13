import type { ComponentPropsWithoutRef, ReactNode, ElementType } from "react";

export type ButtonProps<C extends ElementType = "button"> = {
	title: string;
	icon: ReactNode;
	as?: C;
} & Omit<ComponentPropsWithoutRef<C>, "as">;

export function Button<C extends ElementType = "button">({
	title,
	icon,
	whileHover,
	as,
	className,
	...props
}: ButtonProps<C>) {
	const Component = as ?? "button";

	return (
		<Component
			whileHover={whileHover}
			transition={{ type: "spring", bounce: 0.3 }}
			className={`flex items-center gap-x-2 rounded-xl bg-gray-200/50 px-5 py-3 text-black dark:bg-white/10 dark:text-white ${className}`}
			{...props}
		>
			{icon}
			<h1 className="text-[18px] font-bold">{title}</h1>
		</Component>
	);
}
