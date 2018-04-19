import React from 'react';

const DropdownSlider = ({
	updateColor,
	makeHex,
	cancelColor,
	red,
	green,
	blue,
}) => {
	const style = { background: `rgb(${red},${green},${blue})` };
	const rgb = [
		{ name: 'R', color: red, id: 'red' },
		{ name: 'G', color: green, id: 'green' },
		{ name: 'B', color: blue, id: 'blue' },
	];

	const rgbInputs = rgb.map(({ name, id, color }) => (
		<div className="input_range" key={id}>
			<label htmlFor={id} className="input_range">
				{name}
			</label>
			<input
				id={id}
				className="input_range"
				type="range"
				min="0"
				max="255"
				steps="1"
				value={color}
				onChange={updateColor(id)}
			/>
		</div>
	));

	return (
		<div className="dropdown_slider">
			<div className="dropdown_color" style={style} />
			{rgbInputs}
			<button className="btnOk" onClick={makeHex}>
				OK
			</button>
			<button className="btnCancel" onClick={cancelColor}>
				CANCEL
			</button>
		</div>
	);
};

export default DropdownSlider;
