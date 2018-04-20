export const hexToRgb = hex => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let red = parseInt(result[1], 16),
		green = parseInt(result[2], 16),
		blue = parseInt(result[3], 16);
	return { red, green, blue };
};

export const rgbToHex = rgb => {
	let hex = Number(rgb).toString(16);
	if (hex.length < 2) hex += '0';
	return hex;
};
