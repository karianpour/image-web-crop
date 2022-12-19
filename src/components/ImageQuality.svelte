<script lang="ts">
	export let quality: number;
</script>

<div class="flex flex-col">
	<label>
		<div class="">%{quality}</div>
		<input type="range" bind:value={quality} min="50" max="100" step="1" />
	</label>
</div>
