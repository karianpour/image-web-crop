<script lang="ts">
	import Format from './Format.svelte';
	import type { VariantType } from './ImageExport.svelte';

	import ImageRatio from './ImageRatio.svelte';
	import ImageSize from './ImageSize.svelte';
	import TextInput from './TextInput.svelte';

	export let ratioWidth: number;
	export let ratioHeight: number;
	export let variants: VariantType[];
</script>

<div class="flex flex-col">
	<ImageRatio bind:width={ratioWidth} bind:height={ratioHeight} />
	{#each variants as variant}
		<div class="flex flex-col">
			<ImageSize bind:width={variant.width} ratio={ratioHeight / ratioWidth} />
			<TextInput label="Suffix" bind:value={variant.suffix} />
			<Format bind:value={variant.format} />
		</div>
	{/each}
</div>
