<script context="module" lang="ts">
	export type VariantType = {
		width: number;
		suffix: string;
		format: 'jpg';
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
	let variants: VariantType[] = [
		{
			width: 1200,
			suffix: '-main',
			format: 'jpg',
		},
		{
			width: 800,
			suffix: '-thumb',
			format: 'jpg',
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
	/>
	<OutputParams bind:variants bind:ratioWidth bind:ratioHeight {imageFile} />
</div>
