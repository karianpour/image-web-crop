<script context="module" lang="ts">
	import type { ImageFormatTypes } from '../lib/image-types';

	export type VariantType = {
		width: number;
		suffix: string;
		format: ImageFormatTypes;
		quality: number;
		optimize: boolean;
	};
</script>

<script lang="ts">
	import ImageCrop from './ImageCrop.svelte';
	import OutputParams from './OutputParams.svelte';
	export let imageFile: File;

	let top = 0;
	let left = 0;
	let width = 0;
	let ratioWidth = 16;
	let ratioHeight = 9;
	let rotation = 0;
	let variants: VariantType[] = [
		{
			width: 1200,
			suffix: '-main',
			format: 'image/jpeg',
			quality: 83,
			optimize: true,
		},
		{
			width: 800,
			suffix: '-thumb',
			format: 'image/jpeg',
			quality: 83,
			optimize: true,
		},
	];
</script>

<div class="flex flex-col grow gap-2">
	<ImageCrop
		{imageFile}
		bind:top
		bind:left
		bind:width
		ratio={ratioHeight / ratioWidth}
		bind:rotation
	/>
	<OutputParams
		bind:variants
		bind:ratioWidth
		bind:ratioHeight
		bind:rotation
		{imageFile}
		{top}
		{left}
		{width}
	/>
</div>
