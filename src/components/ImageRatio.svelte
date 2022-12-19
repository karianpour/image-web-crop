<script lang="ts">
	import Button from './Button.svelte';

	export let width: number;
	export let height: number;

	const ratios: { width: number; height: number }[] = [
		{
			width: 16,
			height: 9,
		},
		{
			width: 4,
			height: 3,
		},
		{
			width: 5,
			height: 4,
		},
		{
			width: 3,
			height: 4,
		},
		{
			width: 1,
			height: 2,
		},
		{
			width: 2,
			height: 1,
		},
		{
			width: 1,
			height: 1,
		},
	];

	function toggle() {
		const i = ratios.findIndex((r) => r.width === width && r.height === height);
		let ni = 0;
		if (i < ratios.length - 1) {
			ni = i + 1;
		}
		width = ratios[ni].width;
		height = ratios[ni].height;
	}
</script>

<div>
	{width}:{height}
	<Button on:click={toggle}>change</Button>
</div>
