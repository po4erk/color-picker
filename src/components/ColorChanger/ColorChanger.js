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
			});
		}
	};
	getHex = e => {
		const hex = e.target.dataset.color;
		this.setState({
			hex,
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
		});
	};
	cancelColor = () => {
		this.setState({
			isOpenSlider: !this.state.isOpenSlider,
			hex: this.state.hex,
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
		});
	};
	fullColorRgb = () => {
		let result = hexToRgb(this.state.hex);
		this.setState({
			red: parseInt(result[1], 16),
			green: parseInt(result[2], 16),
			blue: parseInt(result[3], 16),
		});
	};

	render() {
		const upperCase = this.state.hex.toUpperCase();
		const style = { backgroundColor: this.state.hex };
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
