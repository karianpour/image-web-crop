<script lang="ts">
	import { onMount } from 'svelte';
	export let imageFile: File;

	export let top: number;
	export let left: number;
	export let width: number;
	export let ratio: number;
	let imageWidth: number;
	let imageHeight: number;
	const ofset = 3;
	const handleSize = 10;

	let src: string;

	onMount(() => {
		if (FileReader) {
			var fr = new FileReader();
			fr.onload = function () {
				if (typeof fr.result === 'string') {
					src = fr.result;
				}
			};
			fr.readAsDataURL(imageFile);
		} else {
			console.error('FileRreader is not supported in thios browser!');
		}
	});

	let resizeObserver: ResizeObserver;

	function initiateSizes(e: Event) {
		const el = e.currentTarget as HTMLImageElement;
		resizeObserver = new ResizeObserver((entries) => {
			setupSizes(entries[0].target as HTMLElement);
		});
		resizeObserver.observe(el);
	}

	function setupSizes(el: HTMLElement) {
		imageWidth = el.offsetWidth;
		imageHeight = el.offsetHeight;
		const imageRatio = imageHeight / imageWidth;
		if (ratio <= imageRatio) {
			width = imageWidth;
			const height = width * ratio;
			left = 0;
			top = (imageHeight - height) / 2;
		} else {
			const height = imageHeight;
			width = height / ratio;
			left = (imageWidth - width) / 2;
			top = 0;
		}
	}

	$: if (ratio) {
		const el = document.getElementById('main-image') as HTMLImageElement;
		if (el && el.src) {
			setupSizes(el);
		}
	}

	let position = {
		active: false,
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		offset: { x: 0, y: 0 },
	};

	function startDrag(e: PointerEvent) {
		e.stopPropagation();
		e.preventDefault();
		const el = e.currentTarget as HTMLElement;
		const x = e.clientX;
		const y = e.clientY;
		el.setPointerCapture(e.pointerId);
		position = {
			...position,
			active: true,
			top,
			left,
			width,
			height: width * ratio,
			offset: { x, y },
		};
	}
	function moveDrag(e: PointerEvent) {
		const x = e.clientX;
		const y = e.clientY;
		if (position.active) {
			const el = e.currentTarget as HTMLElement;
			const xx = x - position.offset.x;
			const yy = y - position.offset.y;
			const north = el.dataset.north === 'true';
			const west = el.dataset.west === 'true';
			const whole = el.dataset.whole === 'true';
			if (whole) {
				move(yy, xx);
			} else {
				resize(yy, xx, north, west);
			}
		}
	}
	function endDrag(e: PointerEvent) {
		e.stopPropagation();
		e.preventDefault();
		position = {
			...position,
			active: false,
		};
	}

	function move(yy: number, xx: number) {
		top = position.top + yy;
		left = position.left + xx;
		if (top < 0) top = 0;
		if (left < 0) left = 0;
		if (left + width > imageWidth) left = imageWidth - width;
		if (top + width * ratio > imageHeight) top = imageHeight - width * ratio;
	}

	function resize(yy: number, xx: number, north: boolean, west: boolean) {
		let height = width * ratio;
		const after = { top, left, width, height };
		if (yy < xx) {
			if (north) {
				after.top = position.top + yy;
				after.height = position.width * ratio - yy;
			} else {
				after.height = position.width * ratio + yy;
				after.top = position.top;
			}
			if (west) {
				after.width = after.height / ratio;
				after.left = position.left + position.width - after.width;
			} else {
				after.width = after.height / ratio;
				after.left = position.left;
			}
		} else {
			if (west) {
				after.left = position.left + xx;
				after.width = position.width - xx;
			} else {
				after.width = position.width + xx;
				after.left = position.left;
			}
			if (north) {
				after.height = after.width * ratio;
				after.top = position.top + position.height - after.height;
			} else {
				after.top = position.top;
			}
		}
		after.height = after.width * ratio;

		if (
			after.top >= 0 &&
			after.top + after.height <= imageHeight &&
			left >= 0 &&
			after.left + after.width <= imageWidth
		) {
			top = after.top;
			left = after.left;
			width = after.width;
			height = after.height;
		}
	}
</script>

<div class="flex flex-grow flex-col justify-center items-center p-2">
	{#if src}
		<div class="w-fit h-fit justify-center relative">
			<img
				{src}
				id="main-image"
				class="object-contain w-fit max-h-[50vh]"
				alt=""
				on:load={initiateSizes}
			/>
			{#if width}
				<div
					class="absolute border-2 border-dashed border-slate-300 cursor-move"
					style="top: {top}px; left: {left}px; width: {width}px; height: {width *
						ratio}px;"
					data-whole="true"
					on:pointerdown={startDrag}
					on:pointermove={moveDrag}
					on:pointerup={endDrag}
				/>
				<div
					class="absolute bg-sky-700 cursor-se-resize"
					style="top: {top - ofset}px; left: {left -
						ofset}px; width: {handleSize}px; height: {handleSize}px;"
					data-north="true"
					data-west="true"
					on:pointerdown={startDrag}
					on:pointermove={moveDrag}
					on:pointerup={endDrag}
				/>
				<div
					class="absolute bg-sky-700 cursor-sw-resize"
					style="top: {top - ofset}px; left: {left +
						width -
						handleSize +
						ofset}px; width: {handleSize}px; height: {handleSize}px;"
					data-north="true"
					data-west="false"
					on:pointerdown={startDrag}
					on:pointermove={moveDrag}
					on:pointerup={endDrag}
				/>
				<div
					class="absolute bg-sky-700 cursor-nw-resize"
					style="top: {top +
						width * ratio -
						handleSize +
						ofset}px; left: {left +
						width -
						handleSize +
						ofset}px; width: {handleSize}px; height: {handleSize}px;"
					data-north="false"
					data-west="false"
					on:pointerdown={startDrag}
					on:pointermove={moveDrag}
					on:pointerup={endDrag}
				/>
				<div
					class="absolute bg-sky-700 cursor-ne-resize"
					style="top: {top +
						width * ratio -
						handleSize +
						ofset}px; left: {left -
						ofset}px; width: {handleSize}px; height: {handleSize}px;"
					data-north="false"
					data-west="true"
					on:pointerdown={startDrag}
					on:pointermove={moveDrag}
					on:pointerup={endDrag}
				/>
			{/if}
		</div>
	{/if}
</div>
