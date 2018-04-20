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
		this.setState({
			[name]: e.target.value,
			background: `rgb(${this.state.red},${this.state.green},${
				this.state.blue
			}`,
		});
	};
	cancelColor = () => {
		this.setState({
			isOpenSlider: !this.state.isOpenSlider,
			hex: this.state.hex,
			background: this.state.hex,
		});
	};
	makeHex = () => {
		const red = rgbToHex(this.state.red),
			green = rgbToHex(this.state.green),
			blue = rgbToHex(this.state.blue),
			hex = `#${red}${green}${blue}`;
		this.fullColorHex(hex);
	};
	fullColorHex = hex => {
		this.setState({
			isOpenSlider: !this.state.isOpenSlider,
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
