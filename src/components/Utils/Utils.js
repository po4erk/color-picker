export const hexToRgb = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result;
};

export const rgbToHex = rgb => {
	let hex = Number(rgb).toString(16);
	if (hex.length < 2) hex += '0';
	return hex;
};
