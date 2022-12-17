<script lang="ts">
	export let value = '';
	export let label = '';

	const id = crypto.randomUUID();
</script>

<div class="grow flex flex-col items-center gap-1">
	<label
		for={id}
		class="block text-sm font-medium text-gray-900 dark:text-white"
		>{label}</label
	>
	<input
		type="text"
		{id}
		bind:value
		on:click
		class="block w-full p-1 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
	/>
</div>
