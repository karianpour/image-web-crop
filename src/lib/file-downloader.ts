export function downLoadFile(file: File, fileName: string) {
	const url = window.URL.createObjectURL(file);
	const a = document.createElement('a');
	a.style.display = 'none';
	a.href = url;
	a.download = fileName;
	document.body.appendChild(a);
	a.click();
	window.URL.revokeObjectURL(url);
}
