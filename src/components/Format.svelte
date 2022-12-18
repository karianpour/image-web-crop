<script lang="ts">
	import Button from './Button.svelte';
	import { imageFormats, type ImageFormatTypes } from '../lib/image-types';

	export let value: ImageFormatTypes = 'image/jpeg';

	function toggle() {
		const i = imageFormats.findIndex((f) => f === value);
		let ni = 0;
		if (i < imageFormats.length - 1) {
			ni = i + 1;
		}
		value = imageFormats[ni];
	}
</script>

<div class="flex flex-col items-center">
	{value}
	<Button on:click={toggle}>change</Button>
</div>
