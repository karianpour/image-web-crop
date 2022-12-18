export type ImageFormatTypes = 'image/jpeg' | 'image/png';

export const imageFormats: ImageFormatTypes[] = ['image/jpeg', 'image/png'];

export function suggestExtension(format: ImageFormatTypes) {
	if (format === 'image/jpeg') return 'jpg';
	if (format === 'image/png') return 'png';
	return '';
}
