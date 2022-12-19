<script lang="ts">
	export let value: boolean;
</script>

<label class="flex flex-row justify-center gap-1">
	<input type="checkbox" bind:checked={value} />
	<span>Optimize</span>
</label>
