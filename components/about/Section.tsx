import { PropsWithChildren } from "react";
import { Header, type HeaderProps } from "./Header";

export interface SectionProps extends PropsWithChildren, HeaderProps {
	className?: string;
}

export function Section({ children, className = "", title }: SectionProps) {
	return (
		<div
			className={`flex w-full max-w-[600px] flex-col items-start gap-y-1 ${className}`}
		>
			<Header title={title} />
			{children}
		</div>
	);
}
