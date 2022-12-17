<script context="module" lang="ts">
	export type FormatTypes = 'jpg' | 'png';
</script>

<script lang="ts">
	import Button from './Button.svelte';

	export let value = 'jpg';

	export const formats: FormatTypes[] = ['jpg', 'png'];

	function toggle() {
		const i = formats.findIndex((f) => f === value);
		let ni = 0;
		if (i < formats.length - 1) {
			ni = i + 1;
		}
		value = formats[ni];
	}
</script>

<div>
	{value}
	<Button on:click={toggle}>change</Button>
</div>
