"use client";

import { useEffect, useRef } from "react";

const ASCII_GLYPHS = " .:-=+*#%@";
const FALLBACK_COLUMNS = 240;
const FALLBACK_ROWS = 46;
const RIPPLE_COUNT = 12;

const VERTEX_SHADER = `#version 300 es
precision highp float;

void main() {
	vec2 position = vec2(
		float((gl_VertexID << 1) & 2),
		float(gl_VertexID & 2)
	);
	gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_dpr;
uniform float u_glyph_count;
uniform float u_dark_mode;
uniform sampler2D u_glyphs;
uniform vec3 u_ripples[${RIPPLE_COUNT}];

out vec4 out_color;

float hash21(vec2 point) {
	point = fract(point * vec2(123.34, 456.21));
	point += dot(point, point + 45.32);
	return fract(point.x * point.y);
}

float value_noise(vec2 point) {
	vec2 cell = floor(point);
	vec2 local = fract(point);
	local = local * local * local * (local * (local * 6.0 - 15.0) + 10.0);

	float a = hash21(cell);
	float b = hash21(cell + vec2(1.0, 0.0));
	float c = hash21(cell + vec2(0.0, 1.0));
	float d = hash21(cell + vec2(1.0, 1.0));

	return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

float sample_glyph(float glyph_index, vec2 glyph_uv, float weight_row) {
	vec2 safe_uv = clamp(glyph_uv, vec2(0.035), vec2(0.965));
	vec2 atlas_uv = vec2(
		(glyph_index + safe_uv.x) / u_glyph_count,
		(safe_uv.y + 1.0 - weight_row) * 0.5
	);
	return texture(u_glyphs, atlas_uv).a;
}

vec3 spectrum_color(float hue) {
	vec3 channels = clamp(
		abs(fract(hue + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0) - 1.0,
		0.0,
		1.0
	);
	float saturation = mix(1.0, 0.96, u_dark_mode);
	float brightness = mix(0.62, 1.0, u_dark_mode);
	return brightness * mix(vec3(1.0), channels, saturation);
}

void main() {
	vec2 cell_size = vec2(10.0, 15.0) * u_dpr;
	vec2 cell_id = floor(gl_FragCoord.xy / cell_size);
	vec2 glyph_uv = fract(gl_FragCoord.xy / cell_size);
	vec2 field_scale = vec2(0.075, 0.125);
	vec2 field = cell_id * field_scale;
	vec2 field_extent = (u_resolution / cell_size) * field_scale;
	vec2 normalized = (cell_id + 0.5) * cell_size / u_resolution;
	float time = u_time * 0.2;
	vec2 focal_point = vec2(field_extent.x * 0.78, field_extent.y * 0.5);
	vec2 wander = vec2(
		value_noise(vec2(time * 0.28, 7.3)),
		value_noise(vec2(19.1, time * 0.23))
	) - 0.5;
	focal_point += wander * field_extent * vec2(0.55, 0.65);

	// Two scales of smoothly evolving currents bend the patterns like flowing ink.
	vec2 flow_time = vec2(time * 0.26, -time * 0.19);
	vec2 current = vec2(
		value_noise(field * 0.3 + flow_time),
		value_noise(field * 0.3 + flow_time + vec2(23.7, 9.2))
	) - 0.5;
	vec2 warped_field = field + current * 3.8 + wander * 1.4;
	vec2 eddies = vec2(
		value_noise(warped_field * 0.65 - flow_time * 0.7),
		value_noise(warped_field * 0.65 - flow_time * 0.7 + vec2(8.4, 31.6))
	) - 0.5;
	warped_field += eddies * 1.2;

	float wave = sin(warped_field.x * 1.32 + time * 1.75);
	wave += cos(warped_field.y * 1.74 - time * 1.22);
	wave += sin((warped_field.x + warped_field.y) * 0.78 + time * 0.96);
	wave += cos(length(warped_field - focal_point) * 0.9 - time * 1.4);

	vec2 vortex_delta = warped_field - focal_point;
	float vortex_radius = length(vortex_delta);
	float vortex_angle = atan(vortex_delta.y, vortex_delta.x);
	float spiral = sin(vortex_radius * 1.18 - vortex_angle * 2.0 - time * 1.8);
	float diagonal_sweep = sin(
		dot(warped_field, vec2(0.82, 0.57)) * 0.82 - time * 2.05
	);
	wave += spiral * 0.48 + diagonal_sweep * 0.32;

	vec2 ripple_center = field_extent * vec2(0.3, 0.65);
	ripple_center += vec2(wander.y, -wander.x) * field_extent * 0.4;
	float ripples = sin(vortex_radius * 2.1 - time * 1.4);
	ripples += sin(length(warped_field - ripple_center) * 1.8 + time * 0.7);
	float ribbons = sin(warped_field.x * 0.9 + sin(warped_field.y * 0.65 + time * 0.4) * 2.4 + time);
	ribbons += cos(warped_field.y * 1.1 - warped_field.x * 0.35 - time * 0.7);

	// Overlapping weights morph between eddies, interference rings, and ribbons.
	vec3 pattern_weights = 0.15 + vec3(
		value_noise(vec2(time * 0.18, 3.1)),
		value_noise(vec2(time * 0.16, 17.4)),
		value_noise(vec2(time * 0.21, 29.8))
	);
	pattern_weights *= pattern_weights;
	pattern_weights /= dot(pattern_weights, vec3(1.0));
	wave = dot(pattern_weights, vec3(wave, ripples * 1.65, ribbons * 1.65));

	vec2 noise_flow = vec2(time * 0.55, -time * 0.34);
	float noise = value_noise(warped_field * 0.72 + noise_flow);
	noise += value_noise(warped_field * 1.46 - noise_flow * 0.7) * 0.5;

	float hover_wave = 0.0;
	float hover_emphasis = 0.0;
	for (int index = 0; index < ${RIPPLE_COUNT}; index++) {
		vec3 ripple = u_ripples[index];
		float age = u_time - ripple.z;
		if (ripple.z >= 0.0 && age >= 0.0 && age < 3.0) {
			float distance = length((normalized - ripple.xy) * u_resolution / u_dpr);
			float ring = distance - age * 100.0;
			float envelope = exp(-ring * ring / 900.0) * exp(-age * 1.1);
			hover_wave += cos(ring * 0.065) * envelope * smoothstep(0.0, 0.12, age);
			hover_emphasis = max(hover_emphasis, envelope * smoothstep(0.0, 0.08, age));
		}
	}

	float intensity = smoothstep(-1.65, 2.7, wave + noise * 2.15 - 1.0 + hover_wave * 2.5);
	intensity = pow(intensity, 0.88);
	intensity *= mix(0.82, 1.0, smoothstep(0.05, 0.82, normalized.x));

	// Stable variation breaks up repeated characters without random frame-to-frame flicker.
	float glyph_density = clamp(intensity + (hash21(cell_id + vec2(17.0, 43.0)) - 0.5) * 0.18, 0.0, 1.0);
	float glyph_index = intensity < 0.06 ? 0.0 : floor(glyph_density * (u_glyph_count - 1.0) + 0.5);
	float glyph = mix(
		sample_glyph(glyph_index, glyph_uv, 0.0),
		sample_glyph(glyph_index, glyph_uv, 1.0),
		smoothstep(0.05, 0.6, hover_emphasis)
	);
	float pulse = 0.94 + 0.06 * sin(cell_id.x * 0.23 + cell_id.y * 0.17 + time);
	float alpha = glyph * mix(0.78, 1.0, intensity) * pulse;
	// Cell-level inputs keep every pixel of a character the same color.
	// Flowing color bands follow the spiral rather than a screen-space overlay.
	float hue = fract(
		intensity * 0.55 +
		vortex_radius * 0.075 +
		sin(vortex_angle + time * 0.3) * 0.18 -
		time * 0.08 +
		hash21(cell_id) * 0.06 + hover_wave * 0.14
	);
	vec3 glyph_color = spectrum_color(hue);

	out_color = vec4(glyph_color, alpha);
}
`;

function createFallbackField() {
	return Array.from({ length: FALLBACK_ROWS }, (_, row) =>
		Array.from({ length: FALLBACK_COLUMNS }, (_, column) => {
			const wave =
				Math.sin(column * 0.17) +
				Math.cos(row * 0.39) +
				Math.sin((column + row) * 0.1);
			const intensity = Math.max(0, (wave + 3) / 6 - 0.14);
			const glyphIndex = Math.min(
				ASCII_GLYPHS.length - 1,
				Math.floor(intensity * ASCII_GLYPHS.length)
			);

			return ASCII_GLYPHS[glyphIndex];
		}).join("")
	).join("\n");
}

const fallbackField = createFallbackField();

function compileShader(
	gl: WebGL2RenderingContext,
	type: number,
	source: string
) {
	const shader = gl.createShader(type);
	if (!shader) {
		throw new Error("Unable to create ASCII shader.");
	}

	gl.shaderSource(shader, source);
	gl.compileShader(shader);

	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		const message = gl.getShaderInfoLog(shader) ?? "Unknown shader error.";
		gl.deleteShader(shader);
		throw new Error(message);
	}

	return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
	const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
	const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
	const program = gl.createProgram();

	if (!program) {
		throw new Error("Unable to create ASCII shader program.");
	}

	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	gl.deleteShader(vertexShader);
	gl.deleteShader(fragmentShader);

	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		const message = gl.getProgramInfoLog(program) ?? "Unknown program error.";
		gl.deleteProgram(program);
		throw new Error(message);
	}

	return program;
}

function createGlyphTexture(gl: WebGL2RenderingContext) {
	const cellWidth = 32;
	const cellHeight = 48;
	const atlas = document.createElement("canvas");
	atlas.width = cellWidth * ASCII_GLYPHS.length;
	atlas.height = cellHeight * 2;

	const context = atlas.getContext("2d");
	if (!context) {
		throw new Error("Unable to create the ASCII glyph atlas.");
	}

	context.clearRect(0, 0, atlas.width, atlas.height);
	context.fillStyle = "white";
	context.textAlign = "center";
	context.textBaseline = "middle";

	for (const [row, weight] of [400, 800].entries()) {
		context.font = `${weight} 32px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace`;
		for (const [index, glyph] of Array.from(ASCII_GLYPHS).entries()) {
			context.fillText(
				glyph,
				index * cellWidth + cellWidth / 2,
				(row + 0.5) * cellHeight
			);
		}
	}

	const texture = gl.createTexture();
	if (!texture) {
		throw new Error("Unable to create the ASCII glyph texture.");
	}

	gl.bindTexture(gl.TEXTURE_2D, texture);
	gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);

	return texture;
}

export function AsciiBackdrop() {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const mountedCanvas = canvasRef.current;
		if (!mountedCanvas) {
			return;
		}
		const canvas: HTMLCanvasElement = mountedCanvas;

		const mountedContext = canvas.getContext("webgl2", {
			alpha: true,
			antialias: false,
			depth: false,
			powerPreference: "low-power",
			premultipliedAlpha: false,
		});

		if (!mountedContext) {
			return;
		}
		const gl: WebGL2RenderingContext = mountedContext;

		const program = createProgram(gl);
		const glyphTexture = createGlyphTexture(gl);
		const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
		const timeLocation = gl.getUniformLocation(program, "u_time");
		const dprLocation = gl.getUniformLocation(program, "u_dpr");
		const glyphCountLocation = gl.getUniformLocation(program, "u_glyph_count");
		const darkModeLocation = gl.getUniformLocation(program, "u_dark_mode");
		const glyphsLocation = gl.getUniformLocation(program, "u_glyphs");
		const ripplesLocation = gl.getUniformLocation(program, "u_ripples[0]");
		const hoverTarget = canvas.closest("section");
		const ripples = new Float32Array(RIPPLE_COUNT * 3);
		for (let index = 0; index < RIPPLE_COUNT; index++) {
			ripples[index * 3 + 2] = -1;
		}
		let nextRipple = 0;
		let lastPointer: { x: number; y: number } | null = null;
		const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
		const colorQuery = window.matchMedia("(prefers-color-scheme: dark)");
		let animationFrame = 0;
		let isIntersecting = true;
		let lastTime = 0;
		let isDarkMode = colorQuery.matches;

		gl.useProgram(program);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, glyphTexture);
		gl.uniform1i(glyphsLocation, 0);
		gl.uniform1f(glyphCountLocation, ASCII_GLYPHS.length);

		function resize() {
			const bounds = canvas.getBoundingClientRect();
			const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
			const width = Math.max(1, Math.round(bounds.width * dpr));
			const height = Math.max(1, Math.round(bounds.height * dpr));

			if (canvas.width !== width || canvas.height !== height) {
				canvas.width = width;
				canvas.height = height;
				gl.viewport(0, 0, width, height);
			}

			gl.uniform2f(resolutionLocation, width, height);
			gl.uniform1f(dprLocation, dpr);
		}

		function draw(time: number) {
			lastTime = time;
			gl.uniform1f(darkModeLocation, isDarkMode ? 1 : 0);
			gl.uniform1f(timeLocation, time / 1000);
			gl.uniform3fv(ripplesLocation, ripples);
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		}

		function tick(time: number) {
			draw(time);
			animationFrame = window.requestAnimationFrame(tick);
		}

		function syncAnimation() {
			window.cancelAnimationFrame(animationFrame);
			if (motionQuery.matches) {
				for (let index = 0; index < RIPPLE_COUNT; index++) {
					ripples[index * 3 + 2] = -1;
				}
				lastPointer = null;
			}

			if (
				!motionQuery.matches &&
				isIntersecting &&
				document.visibilityState === "visible"
			) {
				animationFrame = window.requestAnimationFrame(tick);
				return;
			}

			draw(motionQuery.matches ? 0 : lastTime);
		}

		const handlePointerMove = (event: PointerEvent) => {
			if (
				motionQuery.matches ||
				event.pointerType === "touch" ||
				!isIntersecting
			) {
				return;
			}
			const now = performance.now();
			const start = lastPointer ?? { x: event.clientX, y: event.clientY };
			const distance = Math.hypot(
				event.clientX - start.x,
				event.clientY - start.y
			);
			if (lastPointer && distance < 12) return;
			const bounds = canvas.getBoundingClientRect();
			if (!bounds.width || !bounds.height) return;
			// Fill gaps between pointer events so quick sweeps leave a connected trail.
			const steps = Math.min(
				RIPPLE_COUNT,
				Math.max(1, Math.ceil(distance / 24))
			);
			for (let step = 1; step <= steps; step++) {
				const progress = step / steps;
				const x = start.x + (event.clientX - start.x) * progress;
				const y = start.y + (event.clientY - start.y) * progress;
				ripples.set(
					[
						(x - bounds.left) / bounds.width,
						1 - (y - bounds.top) / bounds.height,
						now / 1000,
					],
					nextRipple * 3
				);
				nextRipple = (nextRipple + 1) % RIPPLE_COUNT;
			}
			lastPointer = { x: event.clientX, y: event.clientY };
		};
		const handlePointerLeave = () => {
			lastPointer = null;
		};
		const handleResize = () => {
			resize();
			draw(lastTime);
		};
		const resizeObserver = new ResizeObserver(handleResize);
		const intersectionObserver = new IntersectionObserver(([entry]) => {
			isIntersecting = entry.isIntersecting;
			syncAnimation();
		});
		const handleVisibilityChange = () => syncAnimation();
		const handleColorChange = () => {
			isDarkMode = colorQuery.matches;
			draw(lastTime);
		};

		resizeObserver.observe(canvas);
		intersectionObserver.observe(canvas);
		window.addEventListener("resize", handleResize);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		motionQuery.addEventListener("change", syncAnimation);
		colorQuery.addEventListener("change", handleColorChange);
		hoverTarget?.addEventListener("pointerenter", handlePointerMove, {
			passive: true,
		});
		hoverTarget?.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		hoverTarget?.addEventListener("pointerleave", handlePointerLeave);
		canvas.dataset.ready = "true";
		resize();
		draw(0);
		syncAnimation();

		return () => {
			window.cancelAnimationFrame(animationFrame);
			resizeObserver.disconnect();
			intersectionObserver.disconnect();
			window.removeEventListener("resize", handleResize);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			motionQuery.removeEventListener("change", syncAnimation);
			colorQuery.removeEventListener("change", handleColorChange);
			hoverTarget?.removeEventListener("pointerenter", handlePointerMove);
			hoverTarget?.removeEventListener("pointermove", handlePointerMove);
			hoverTarget?.removeEventListener("pointerleave", handlePointerLeave);
			delete canvas.dataset.ready;
			gl.deleteTexture(glyphTexture);
			gl.deleteProgram(program);
		};
	}, []);

	return (
		<div className="ascii-backdrop" aria-hidden="true">
			<canvas ref={canvasRef} className="ascii-backdrop__canvas" />
			<pre className="ascii-backdrop__fallback">{fallbackField}</pre>
		</div>
	);
}
