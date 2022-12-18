import type { ImageFormatTypes } from './image-types';

type Area = {
	width: number;
	height: number;
	top: number;
	left: number;
};

const createImage = (url: string): Promise<HTMLImageElement> =>
	new Promise((resolve, reject) => {
		const image = new Image();
		image.addEventListener('load', () => resolve(image));
		image.addEventListener('error', (error) => reject(error));
		image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
		image.src = url;
	});

function getRadianAngle(degreeValue: number): number {
	return (degreeValue * Math.PI) / 180;
}

export async function getCroppedImg(
	imageSrc: string,
	pixelCrop: Area,
	finalWidth: number,
	rotation = 0,
	format: ImageFormatTypes,
	quality: any,
	backgroundColor: string,
): Promise<Blob | null> {
	const image = await createImage(imageSrc);
	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');
	if (!ctx) return null;

	const maxSize = Math.max(image.width, image.height);
	const safeAreaW = 2 * ((maxSize / 2) * Math.sqrt(2));
	const safeAreaH = 2 * ((maxSize / 2) * Math.sqrt(2));
	const scale = finalWidth / pixelCrop.width;

	// set each dimensions to double largest dimension to allow for a safe area for the
	// image to rotate in without being clipped by canvas context
	canvas.width = safeAreaW;
	canvas.height = safeAreaH;

	if (format === 'image/jpeg') {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	// translate canvas context to a central location on image to allow rotating around the center.
	ctx.translate(safeAreaW / 2, safeAreaH / 2);
	ctx.scale(scale, scale);
	ctx.rotate(getRadianAngle(rotation));
	ctx.translate(-image.width / 2, -image.height / 2);

	// draw rotated image and store data.
	ctx.drawImage(image, 0, 0);

	ctx.setTransform(1, 0, 0, 1, 0, 0);
	const data = ctx.getImageData(
		safeAreaW / 2 - (image.width * scale) / 2 + pixelCrop.left * scale,
		safeAreaH / 2 - (image.height * scale) / 2 + pixelCrop.top * scale,
		pixelCrop.width * scale,
		pixelCrop.height * scale,
	);

	// set canvas width to final desired crop size - this will clear existing context
	canvas.width = pixelCrop.width * scale;
	canvas.height = pixelCrop.height * scale;

	if (format === 'image/jpeg') {
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	// // paste generated rotate image with correct offsets for x,y crop values.
	ctx.putImageData(data, 0, 0);

	return new Promise((resolve) => {
		canvas.toBlob(
			(file) => {
				resolve(file);
			},
			format,
			quality,
		);
	});
}
