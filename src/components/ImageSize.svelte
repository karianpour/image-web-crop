<script lang="ts">
	export let ratio: number;
	export let width: number;
</script>

<div class="flex flex-col">
	<label>
		<div class="">{width} / {Math.round(width * ratio)}</div>
		<input type="range" bind:value={width} min="100" max="2000" step="10" />
	</label>
</div>
