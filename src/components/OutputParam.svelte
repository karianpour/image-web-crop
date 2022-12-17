<script lang="ts">
	import Button from './Button.svelte';
	import Format from './Format.svelte';
	import type { VariantType } from './ImageExport.svelte';

	import ImageSize from './ImageSize.svelte';
	import TextInput from './TextInput.svelte';

	export let imageFile: File;
	export let ratio: number;
	export let fileName: string;
	export let variant: VariantType;

	function download() {
		console.log('download', fileName, imageFile, ratio, variant);
	}
</script>

<div class="flex flex-row items-center gap-2">
	<Format bind:value={variant.format} />
	<ImageSize bind:width={variant.width} {ratio} />
	<div class="flex grow max-w-[10rem]">
		<TextInput label="Suffix" bind:value={variant.suffix} />
	</div>
</div>
<Button on:click={download}>Download</Button>
