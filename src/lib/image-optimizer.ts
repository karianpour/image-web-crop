import { browser } from '$app/environment';
import type { ImageFormatTypes } from './image-types';

const workerCode = `
    importScripts('https://unpkg.com/mozjpeg-js', 'https://cdn.rawgit.com/psych0der/pngquantjs/master/demo/js/pngquant.min.js');
    onmessage = function(event) {
        const {args, type, data} = event.data, 
            optimize = type=='image/png' ? pngquant : mozjpeg.encode;
        const result = optimize(data, args, console.log);
        postMessage(result);
    };
`;

const workerUrl = browser
	? URL.createObjectURL(
			new Blob([workerCode], { type: 'application/javascript' }),
	  )
	: undefined;

export async function optimize(
	inputBuf: ArrayBuffer,
	type: ImageFormatTypes,
	quality: number,
): Promise<BlobPart[] | undefined> {
	if (!workerUrl) return;
	const worker = new Worker(workerUrl);
	const p = new Promise<BlobPart[]>((resolve) => {
		worker.onmessage = (event) => {
			resolve([event.data.data]);
			worker.terminate();
		};
	});

	let args: any = undefined;
	if (type === 'image/jpeg') {
		args = { quality };
	} else if (type === 'image/png') {
		args = { quality: `${quality - 5}-${quality + 5}`, speed: '2' };
	}

	worker.postMessage({
		data: new Uint8Array(inputBuf),
		type,
		args,
	});
	const newFile = await p;
	return newFile;
}
