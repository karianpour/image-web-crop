<script context="module" lang="ts">
	export type FileSelectionType = {
		file: File;
	};
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher<{ selected: FileSelectionType }>();

	function dragingover(event: DragEvent) {
		event.preventDefault();
	}
	function dropped(event: DragEvent) {
		event.preventDefault();
		console.log(event);

		if (!event.dataTransfer) return;
		console.log('1');

		let file: File | null = null;

		if (event.dataTransfer.items) {
			const array = [...event.dataTransfer.items];
			for (let item of array) {
				if (item.kind === 'file') {
					const itemFile = item.getAsFile();
					if (itemFile) file = itemFile;
					break;
				}
			}
		} else {
			const array = [...event.dataTransfer.files];
			if (array.length > 0) file = array[0];
		}
		if (file) {
			dispatch('selected', {
				file,
			});
		}
	}

	function selected(
		event: Event & { currentTarget: EventTarget & HTMLInputElement },
	) {
		if (event.currentTarget.files && event.currentTarget.files.length) {
			const [file] = event.currentTarget.files;
			dispatch('selected', {
				file,
			});
		}
	}

	let id = crypto.randomUUID();
</script>

<div class="flex items-center justify-center grow">
	<div class="flex items-center justify-center w-full max-w-xl">
		<label
			for={id}
			class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
			on:drop={dropped}
			on:dragover={dragingover}
		>
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				<svg
					aria-hidden="true"
					class="w-10 h-10 mb-3 text-gray-400"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
					/></svg
				>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to upload</span> or drag and drop
				</p>
				<p class="text-xs text-gray-500 dark:text-gray-400">
					JPG, PNG, ... and image
				</p>
			</div>
			<input
				{id}
				type="file"
				class="hidden"
				on:change={selected}
				accept="image/*"
			/>
		</label>
	</div>
</div>
