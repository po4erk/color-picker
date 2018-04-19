import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DropdownPreset from './DropdownPreset';
import DropdownSlider from './DropdownSlider'

class ColorChanger extends Component{
    state = {
        isOpenPreset: false,
        isOpenSlider: false,
        hex: '#ffcc33',
        red: 0,
        green: 0,
        blue: 0
    };
    componentDidMount(){
        document.addEventListener('click', this.handleClickOutside);
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleClickOutside);
    }
    handleClickOutside = (e) => {
        const element = ReactDOM.findDOMNode(this);
        if ((!element || !element.contains(e.target))) {
            this.setState({
                isOpenPreset: false,
                isOpenSlider: false,
            });
        }
    }
    getHex = (e) => {
        const hex = e.target.dataset.color;
        this.setState({
        hex
        });
    };
    togglePreset = () => {
        if(this.state.isOpenSlider){
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                isOpenPreset: !this.state.isOpenPreset 
             });
        }else{
            this.setState({
                isOpenPreset: !this.state.isOpenPreset 
             });
        }
    };
    toggleSlider = () => {
        this.hexToRgb();
        if(this.state.isOpenPreset){
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                isOpenPreset: !this.state.isOpenPreset 
             });
        }else{
            this.setState({
                isOpenSlider: !this.state.isOpenSlider 
             });
        }
    };
    updateColor = (e) => {
        const target = e.target.id;
        if(target === 'red'){
            this.setState({
                red: e.target.value,
            });
        }else if(target === 'blue'){
            this.setState({
                blue: e.target.value,
            });
        }else if(target === 'green'){
            this.setState({
                green: e.target.value,
            });
        }
    };
    cancelColor = () => {
        this.setState({
            isOpenSlider: !this.state.isOpenSlider,
            hex: this.state.hex
        });
    };
    hexToRgb = () => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.hex);
        return result ? this.setState({
            red: parseInt(result[1], 16),
            green: parseInt(result[2], 16),
            blue: parseInt(result[3], 16)
        }) : null;
    };
    rgbToHex = (rgb) => { 
        let hex = Number(rgb).toString(16);
        if (hex.length < 2) {
             hex += "0";
        }
        return hex;
    };
    fullColorHex = () => {
        const red = this.rgbToHex(this.state.red);
        const green = this.rgbToHex(this.state.green);
        const blue = this.rgbToHex(this.state.blue);
        const rgb = `#${red}${green}${blue}`;
        if(this.state.isOpenSlider)
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                hex: rgb
            });
    };
    
    render(){
        const upperCase = this.state.hex.toUpperCase();
        const style = {backgroundColor: this.state.hex}
        const colorPresets = this.state.isOpenPreset && <DropdownPreset getHex={this.getHex}/>
        const colorSliders = this.state.isOpenSlider && <DropdownSlider updateColor={this.updateColor}
                                                                        fullColorHex={this.fullColorHex}
                                                                        cancelColor={this.cancelColor}
                                                                        red={this.state.red}
                                                                        green={this.state.green}
                                                                        blue={this.state.blue}/>  
        return(
            <div>
                <div className='color_hex'>{upperCase}</div>
                <div className='color_wrapper'>
                    <div className='color' style={style} onClick={this.toggleSlider}></div>
                </div>
                <div className='dropdown_wrapper'>
                    <button className='dropdown' onClick={this.togglePreset}></button>
                    {colorPresets}
                    {colorSliders}
                </div>
            </div>
        )
    };
}
export default ColorChanger;