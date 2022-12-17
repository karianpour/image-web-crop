<script lang="ts">
	import ImageExport from './ImageExport.svelte';
	import ImageSelector, {
		type FileSelectionType,
	} from './ImageSelector.svelte';

	let imageInput: { imageFile?: File } = {};

	function imageSelected(e: CustomEvent<FileSelectionType>) {
		imageInput.imageFile = e.detail.file;
	}
</script>

<div class="flex flex-col flex-grow">
	{#if !imageInput.imageFile}
		<ImageSelector on:selected={imageSelected} />
	{/if}

	{#if imageInput.imageFile}
		<ImageExport imageFile={imageInput.imageFile} />
	{/if}
</div>
