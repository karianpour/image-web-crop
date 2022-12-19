<script lang="ts">
	import { suggestExtension } from '../lib/image-types';
	import { downLoadFile } from '../lib/file-downloader';
	import { getCroppedImg } from '../lib/image-cropper';
	import { optimize } from '../lib/image-optimizer';
	import Button from './Button.svelte';
	import Format from './Format.svelte';
	import type { VariantType } from './ImageExport.svelte';

	import ImageSize from './ImageSize.svelte';
	import TextInput from './TextInput.svelte';
	import ImageQuality from './ImageQuality.svelte';
	import Optimization from './Optimization.svelte';

	export let imageFile: File;
	export let ratio: number;
	export let rotation: number;
	export let fileName: string;
	export let variant: VariantType;
	export let top: number;
	export let left: number;
	export let width: number;
	export let height: number;

	async function download() {
		const extension = suggestExtension(variant.format);
		const newFileName = fileName + variant.suffix + '.' + extension;

		const src = URL.createObjectURL(imageFile);

		const cropped = await getCroppedImg(
			src,
			{ width, height, top, left },
			variant.width,
			rotation,
			variant.format,
			variant.optimize ? 100 : variant.quality,
			'#fff',
		);
		if (!cropped) return;

		let newFile: File;
		if (variant.optimize) {
			const buf = await cropped.arrayBuffer();
			const optimized = await optimize(buf, variant.format, variant.quality);
			if (!optimized) return;
			newFile = new File(optimized, fileName, { type: variant.format });
		} else {
			newFile = new File([cropped], fileName, { type: variant.format });
		}

		downLoadFile(newFile, newFileName);
	}
</script>

<div class="flex flex-row items-center gap-2">
	<Format bind:value={variant.format} />
	<ImageSize bind:width={variant.width} {ratio} />
	<ImageQuality bind:quality={variant.quality} />
	<Optimization bind:value={variant.optimize} />
	<div class="flex grow max-w-[10rem]">
		<TextInput label="Suffix" bind:value={variant.suffix} />
	</div>
</div>
<Button on:click={download}>Download</Button>
