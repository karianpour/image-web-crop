<script lang="ts">
	import type { VariantType } from './ImageExport.svelte';

	import ImageRatio from './ImageRatio.svelte';
	import OutputParam from './OutputParam.svelte';

	export let imageFile: File;
	export let ratioWidth: number;
	export let ratioHeight: number;
	export let variants: VariantType[];

	const fileName = getFileName(imageFile);

	function getFileName(file: File) {
		let n = file.name;
		let i = n.lastIndexOf('.');
		if (i !== -1) {
			n = n.substring(0, i);
		}
		return n;
	}
</script>

<div class="flex flex-col gap-2">
	<div>{fileName}</div>
	<ImageRatio bind:width={ratioWidth} bind:height={ratioHeight} />
	{#each variants as variant}
		<OutputParam
			{imageFile}
			ratio={ratioHeight / ratioWidth}
			{variant}
			{fileName}
		/>
	{/each}
</div>
