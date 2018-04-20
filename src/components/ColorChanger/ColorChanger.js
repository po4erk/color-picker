import React, { Component } from 'react';
import DropdownPreset from '../DropdownPreset/DropdownPreset';
import DropdownSlider from '../DropdownSlider/DropdownSlider';
import { hexToRgb, rgbToHex } from '../Utils/Utils';

class ColorChanger extends Component {
	state = {
		isOpenPreset: false,
		isOpenSlider: false,
		hex: '#ffcc33',
		red: 0,
		green: 0,
		blue: 0,
		background: '#ffcc33',
	};
	componentDidMount() {
		document.addEventListener('click', this.handleClickOutside);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClickOutside);
	}
	handleClickOutside = e => {
		const element = this.ColorChanger;
		if (!element || !element.contains(e.target)) {
			this.setState({
				isOpenPreset: false,
				isOpenSlider: false,
				background: this.state.hex,
			});
		}
	};
	getHex = e => {
		const hex = e.target.dataset.color;
		this.setState({
			hex,
			background: hex,
		});
	};
	togglePreset = () => {
		const { isOpenSlider } = this.state,
			{ isOpenPreset } = this.state;
		if (isOpenSlider) {
			this.setState({
				isOpenSlider: !isOpenSlider,
				isOpenPreset: !isOpenPreset,
			});
		} else {
			this.setState({
				isOpenPreset: !isOpenPreset,
			});
		}
	};
	toggleSlider = () => {
		const { isOpenSlider } = this.state,
			{ isOpenPreset } = this.state;
		this.fullColorRgb();
		if (isOpenPreset) {
			this.setState({
				isOpenSlider: !isOpenSlider,
				isOpenPreset: !isOpenPreset,
			});
		} else {
			this.setState({
				isOpenSlider: !isOpenSlider,
			});
		}
	};
	updateColor = name => e => {
		const { red, green, blue } = this.state,
			background = `rgb(${red},${green},${blue}`;
		this.setState({
			[name]: e.target.value,
			background,
		});
	};
	cancelColor = () => {
		const { isOpenSlider, hex } = this.state;
		this.setState({
			isOpenSlider: !isOpenSlider,
			hex,
			background: hex,
		});
	};
	makeHex = () => {
		const { red, green, blue } = this.state;
		const rgbRed = rgbToHex(red),
			rgbGreen = rgbToHex(green),
			rgbBlue = rgbToHex(blue),
			hex = `#${rgbRed}${rgbGreen}${rgbBlue}`;
		this.fullColorHex(hex);
	};
	fullColorHex = hex => {
		const { isOpenSlider } = this.state;
		this.setState({
			isOpenSlider: !isOpenSlider,
			hex,
			background: this.state.hex,
		});
	};
	fullColorRgb = () => {
		let { red, green, blue } = hexToRgb(this.state.hex);
		this.setState({
			red,
			green,
			blue,
		});
	};

	render() {
		const upperCase = this.state.hex.toUpperCase();
		const style = { background: this.state.background };
		const colorPresets = this.state.isOpenPreset && (
			<DropdownPreset getHex={this.getHex} />
		);
		const colorSliders = this.state.isOpenSlider && (
			<DropdownSlider
				updateColor={this.updateColor}
				makeHex={this.makeHex}
				cancelColor={this.cancelColor}
				red={this.state.red}
				green={this.state.green}
				blue={this.state.blue}
			/>
		);
		return (
			<div ref={el => (this.ColorChanger = el)}>
				<div className="color_hex">{upperCase}</div>
				<div className="color_wrapper">
					<div className="color" style={style} onClick={this.toggleSlider} />
				</div>
				<div className="dropdown_wrapper">
					<button className="dropdown" onClick={this.togglePreset} />
					{colorPresets}
					{colorSliders}
				</div>
			</div>
		);
	}
}
export default ColorChanger;
