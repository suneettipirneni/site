"use client";

import { useEffect, useRef } from "react";

const ASCII_GLYPHS = " .:-=+*#%@";
const FALLBACK_COLUMNS = 240;
const FALLBACK_ROWS = 46;

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

out vec4 out_color;

float hash21(vec2 point) {
	point = fract(point * vec2(123.34, 456.21));
	point += dot(point, point + 45.32);
	return fract(point.x * point.y);
}

float value_noise(vec2 point) {
	vec2 cell = floor(point);
	vec2 local = fract(point);
	local = local * local * (3.0 - 2.0 * local);

	float a = hash21(cell);
	float b = hash21(cell + vec2(1.0, 0.0));
	float c = hash21(cell + vec2(0.0, 1.0));
	float d = hash21(cell + vec2(1.0, 1.0));

	return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
}

vec3 hsv_to_rgb(vec3 color) {
	vec3 channels = clamp(
		abs(fract(color.x + vec3(0.0, 2.0 / 3.0, 1.0 / 3.0)) * 6.0 - 3.0) - 1.0,
		0.0,
		1.0
	);
	channels = channels * channels * (3.0 - 2.0 * channels);
	return color.z * mix(vec3(1.0), channels, color.y);
}

float sample_glyph(float glyph_index, vec2 glyph_uv) {
	vec2 safe_uv = clamp(glyph_uv, vec2(0.035), vec2(0.965));
	vec2 atlas_uv = vec2(
		(glyph_index + safe_uv.x) / u_glyph_count,
		safe_uv.y
	);
	return texture(u_glyphs, atlas_uv).a;
}

void main() {
	vec2 cell_size = vec2(10.0, 15.0) * u_dpr;
	vec2 cell_id = floor(gl_FragCoord.xy / cell_size);
	vec2 glyph_uv = fract(gl_FragCoord.xy / cell_size);
	vec2 field_scale = vec2(0.115, 0.19);
	vec2 field = cell_id * field_scale;
	vec2 field_extent = (u_resolution / cell_size) * field_scale;
	vec2 normalized = gl_FragCoord.xy / u_resolution;
	float time = u_time * 0.34;
	vec2 focal_point = vec2(field_extent.x * 0.78, field_extent.y * 0.5);
	focal_point += vec2(sin(time * 0.72), cos(time * 0.58)) * vec2(2.2, 1.4);

	vec2 warped_field = field;
	warped_field.x += sin(field.y * 0.58 + time * 0.9) * 0.48;
	warped_field.y += cos(field.x * 0.44 - time * 0.72) * 0.38;

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

	vec2 noise_flow = vec2(time * 0.55, -time * 0.34);
	float noise = value_noise(warped_field * 0.72 + noise_flow);
	noise += value_noise(warped_field * 1.46 - noise_flow * 0.7) * 0.5;

	float intensity = smoothstep(-1.65, 2.7, wave + noise * 2.15 - 1.0);
	intensity = pow(intensity, 0.88);
	intensity *= mix(0.82, 1.0, smoothstep(0.05, 0.82, normalized.x));

	float glyph_index = floor(intensity * (u_glyph_count - 1.0) + 0.5);
	float glyph = sample_glyph(glyph_index, glyph_uv);
	float glow = 0.0;
	glow += sample_glyph(glyph_index, glyph_uv + vec2(0.075, 0.0));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(-0.075, 0.0));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(0.0, 0.075));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(0.0, -0.075));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(0.055, 0.055));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(-0.055, 0.055));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(0.055, -0.055));
	glow += sample_glyph(glyph_index, glyph_uv + vec2(-0.055, -0.055));
	glow *= 0.125;

	float pulse = 0.83 + 0.17 * sin(cell_id.x * 0.23 + cell_id.y * 0.17 + time);
	float core_alpha = glyph * mix(0.5, 1.0, intensity) * pulse;
	float halo_alpha = max(glow - glyph * 0.2, 0.0) * mix(0.32, 0.58, u_dark_mode);
	float alpha = min(core_alpha + halo_alpha, 1.0);

	float hue = fract(
		normalized.x * 0.92 +
		normalized.y * 0.3 +
		noise * 0.08 -
		time * 0.045 +
		sin(vortex_angle * 2.0 + time * 0.8) * 0.035
	);
	vec3 spectrum = hsv_to_rgb(vec3(
		hue,
		mix(0.98, 0.9, u_dark_mode),
		mix(0.8, 1.0, u_dark_mode)
	));
	vec3 neutral = mix(vec3(0.035), vec3(0.965), u_dark_mode);
	vec3 glyph_color = mix(neutral, spectrum, 0.98);

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
	atlas.height = cellHeight;

	const context = atlas.getContext("2d");
	if (!context) {
		throw new Error("Unable to create the ASCII glyph atlas.");
	}

	context.clearRect(0, 0, atlas.width, atlas.height);
	context.fillStyle = "white";
	context.font =
		'600 32px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace';
	context.textAlign = "center";
	context.textBaseline = "middle";

	for (const [index, glyph] of Array.from(ASCII_GLYPHS).entries()) {
		context.fillText(glyph, index * cellWidth + cellWidth / 2, cellHeight / 2);
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
			gl.drawArrays(gl.TRIANGLES, 0, 3);
		}

		function tick(time: number) {
			draw(time);
			animationFrame = window.requestAnimationFrame(tick);
		}

		function syncAnimation() {
			window.cancelAnimationFrame(animationFrame);

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
