"use client";

import {
	type KeyboardEvent as ReactKeyboardEvent,
	type PointerEvent as ReactPointerEvent,
	useEffect,
	useRef,
} from "react";

interface ScrollMetrics {
	maxScroll: number;
	thumbHeight: number;
	trackHeight: number;
}

interface DragState {
	pointerId: number;
	startScrollY: number;
	startY: number;
}

const MIN_THUMB_HEIGHT = 48;

function clamp(value: number, minimum: number, maximum: number) {
	return Math.min(Math.max(value, minimum), maximum);
}

export function BlockScrollbar() {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);
	const frameRef = useRef(0);
	const metricsRef = useRef<ScrollMetrics>({
		maxScroll: 0,
		thumbHeight: 0,
		trackHeight: 0,
	});
	const dragRef = useRef<DragState | null>(null);

	useEffect(() => {
		const mountedTrack = trackRef.current;
		const mountedThumb = thumbRef.current;
		if (!mountedTrack || !mountedThumb) {
			return;
		}
		const track: HTMLDivElement = mountedTrack;
		const thumb: HTMLDivElement = mountedThumb;

		function updateScrollbar() {
			frameRef.current = 0;
			const documentHeight = Math.max(
				document.documentElement.scrollHeight,
				document.body.scrollHeight
			);
			const trackHeight = window.innerHeight;
			const maxScroll = Math.max(0, documentHeight - trackHeight);
			const thumbHeight =
				maxScroll === 0
					? 0
					: Math.min(
							trackHeight,
							Math.max(
								MIN_THUMB_HEIGHT,
								(trackHeight / documentHeight) * trackHeight
							)
					  );
			const travel = Math.max(0, trackHeight - thumbHeight);
			const scrollY = clamp(window.scrollY, 0, maxScroll);
			const top = maxScroll === 0 ? 0 : (scrollY / maxScroll) * travel;
			const percentage =
				maxScroll === 0 ? 0 : Math.round((scrollY / maxScroll) * 100);

			metricsRef.current = { maxScroll, thumbHeight, trackHeight };
			track.dataset.state = maxScroll > 1 ? "visible" : "hidden";
			track.tabIndex = maxScroll > 1 ? 0 : -1;
			track.toggleAttribute("aria-hidden", maxScroll <= 1);
			track.setAttribute("aria-valuemax", String(Math.round(maxScroll)));
			track.setAttribute("aria-valuenow", String(Math.round(scrollY)));
			track.setAttribute("aria-valuetext", `${percentage}% scrolled`);
			thumb.style.height = `${thumbHeight}px`;
			thumb.style.transform = `translate3d(0, ${top}px, 0)`;
		}

		function requestUpdate() {
			if (frameRef.current !== 0) {
				return;
			}

			frameRef.current = window.requestAnimationFrame(updateScrollbar);
		}

		const resizeObserver = new ResizeObserver(requestUpdate);
		resizeObserver.observe(document.documentElement);
		resizeObserver.observe(document.body);
		window.addEventListener("scroll", requestUpdate, { passive: true });
		window.addEventListener("resize", requestUpdate);
		updateScrollbar();

		return () => {
			window.cancelAnimationFrame(frameRef.current);
			resizeObserver.disconnect();
			window.removeEventListener("scroll", requestUpdate);
			window.removeEventListener("resize", requestUpdate);
		};
	}, []);

	function scrollToTrackPosition(clientY: number) {
		const track = trackRef.current;
		if (!track) {
			return;
		}

		const { maxScroll, thumbHeight, trackHeight } = metricsRef.current;
		const travel = trackHeight - thumbHeight;
		if (maxScroll <= 0 || travel <= 0) {
			return;
		}

		const bounds = track.getBoundingClientRect();
		const position = clamp(clientY - bounds.top - thumbHeight / 2, 0, travel);
		window.scrollTo({ top: (position / travel) * maxScroll, behavior: "auto" });
	}

	function handleTrackPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
		if (event.target !== event.currentTarget) {
			return;
		}

		event.preventDefault();
		event.currentTarget.focus({ preventScroll: true });
		scrollToTrackPosition(event.clientY);
	}

	function handleThumbPointerDown(event: ReactPointerEvent<HTMLDivElement>) {
		event.preventDefault();
		event.stopPropagation();
		trackRef.current?.focus({ preventScroll: true });
		dragRef.current = {
			pointerId: event.pointerId,
			startScrollY: window.scrollY,
			startY: event.clientY,
		};
		event.currentTarget.setPointerCapture(event.pointerId);
		trackRef.current?.setAttribute("data-dragging", "true");
	}

	function handleThumbPointerMove(event: ReactPointerEvent<HTMLDivElement>) {
		const drag = dragRef.current;
		if (!drag || drag.pointerId !== event.pointerId) {
			return;
		}

		const { maxScroll, thumbHeight, trackHeight } = metricsRef.current;
		const travel = trackHeight - thumbHeight;
		if (maxScroll <= 0 || travel <= 0) {
			return;
		}

		const scrollDelta = ((event.clientY - drag.startY) / travel) * maxScroll;
		window.scrollTo({
			top: clamp(drag.startScrollY + scrollDelta, 0, maxScroll),
			behavior: "auto",
		});
	}

	function finishDragging(event: ReactPointerEvent<HTMLDivElement>) {
		if (dragRef.current?.pointerId !== event.pointerId) {
			return;
		}

		if (event.currentTarget.hasPointerCapture(event.pointerId)) {
			event.currentTarget.releasePointerCapture(event.pointerId);
		}
		dragRef.current = null;
		trackRef.current?.removeAttribute("data-dragging");
	}

	function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
		const { maxScroll } = metricsRef.current;
		const pageStep = window.innerHeight * 0.9;
		let nextScroll: number | null = null;

		switch (event.key) {
			case "ArrowDown":
				nextScroll = window.scrollY + 40;
				break;
			case "ArrowUp":
				nextScroll = window.scrollY - 40;
				break;
			case "PageDown":
				nextScroll = window.scrollY + pageStep;
				break;
			case "PageUp":
				nextScroll = window.scrollY - pageStep;
				break;
			case "Home":
				nextScroll = 0;
				break;
			case "End":
				nextScroll = maxScroll;
				break;
			default:
				return;
		}

		event.preventDefault();
		window.scrollTo({
			top: clamp(nextScroll, 0, maxScroll),
			behavior: "auto",
		});
	}

	return (
		<div
			ref={trackRef}
			role="scrollbar"
			tabIndex={-1}
			aria-hidden="true"
			aria-controls="main-content"
			aria-label="Page scroll"
			aria-orientation="vertical"
			aria-valuemin={0}
			aria-valuemax={0}
			aria-valuenow={0}
			aria-valuetext="0% scrolled"
			data-slot="block-scrollbar"
			data-state="hidden"
			className="block-scrollbar"
			onKeyDown={handleKeyDown}
			onPointerDown={handleTrackPointerDown}
		>
			<div
				ref={thumbRef}
				data-slot="block-scrollbar-thumb"
				className="block-scrollbar__thumb"
				onPointerDown={handleThumbPointerDown}
				onPointerMove={handleThumbPointerMove}
				onPointerUp={finishDragging}
				onPointerCancel={finishDragging}
			/>
		</div>
	);
}
