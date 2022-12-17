<script lang="ts">
	import Button from './Button.svelte';
	import Format from './Format.svelte';
	import type { VariantType } from './ImageExport.svelte';

	import ImageRatio from './ImageRatio.svelte';
	import ImageSize from './ImageSize.svelte';
	import TextInput from './TextInput.svelte';

	export let imageFile: File;
	export let ratioWidth: number;
	export let ratioHeight: number;
	export let variants: VariantType[];

	function download() {
		console.log('download', fileName);
	}

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
		<div class="flex flex-row items-center gap-2">
			<Format bind:value={variant.format} />
			<ImageSize bind:width={variant.width} ratio={ratioHeight / ratioWidth} />
			<div class="flex grow max-w-[10rem]">
				<TextInput label="Suffix" bind:value={variant.suffix} />
			</div>
		</div>
		<Button on:click={download}>Download</Button>
	{/each}
</div>
