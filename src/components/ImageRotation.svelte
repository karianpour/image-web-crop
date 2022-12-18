<script lang="ts">
	export let rotation: number;
</script>

<label class="flex flex-col items-center">
	<div class="">{rotation} deg</div>
	<input type="range" bind:value={rotation} min="-45" max="45" step="0.5" />
</label>
