import React, { Component } from 'react';
import DropdownPreset from '../DropdownPreset/DropdownPreset';
import DropdownSlider from '../DropdownSlider/DropdownSlider';

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
        const element = this.ColorChanger;
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
    //state в переменную
    togglePreset = () => {
        let openPreset = this.state.isOpenPreset,
            openSlider = this.state.isOpenSlider;
        if(openSlider){
            this.setState({
                isOpenSlider: !openSlider,
                isOpenPreset: !openPreset 
             });
        }else{
            this.setState({
                isOpenPreset: !openPreset 
             });
        }
    };
    toggleSlider = () => {
        let openPreset = this.state.isOpenPreset,
            openSlider = this.state.isOpenSlider;
        this.hexToRgb();
        if(openPreset){
            this.setState({
                isOpenSlider: !openSlider,
                isOpenPreset: !openPreset 
             });
        }else{
            this.setState({
                isOpenSlider: !openSlider
             });
        }
    };
    updateColor = (name) => (e) => {
        this.setState({
            [name]: e.target.value,
        });
    };
    cancelColor = () => {
        this.setState({
            isOpenSlider: !this.state.isOpenSlider,
            hex: this.state.hex
        });
    };
    //go to utils
    hexToRgb = () => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.hex);
        let red = parseInt(result[1], 16),
            green = parseInt(result[2], 16),
            blue = parseInt(result[3], 16);
        this.fullColorRgb(red,green,blue);
    };
    rgbToHex = (rgb) => { 
        let hex = Number(rgb).toString(16);
        if(hex.length < 2) hex += "0";
        return hex;
    };
    fullColorRgb = (red,green,blue) => {
        this.setState({
            red,
            green,
            blue
        })
    }
    makeHex = () => {
        const red = this.rgbToHex(this.state.red);
        const green = this.rgbToHex(this.state.green);
        const blue = this.rgbToHex(this.state.blue);
        const hex = `#${red}${green}${blue}`;
        this.fullColorHex(hex);
    }
    fullColorHex = (hex) => {
        if(this.state.isOpenSlider)
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                hex
            });
    };
    
    render(){
        const upperCase = this.state.hex.toUpperCase();
        const style = {backgroundColor: this.state.hex}
        const colorPresets = this.state.isOpenPreset && <DropdownPreset getHex={this.getHex}/>
        const colorSliders = this.state.isOpenSlider && <DropdownSlider updateColor={this.updateColor}
                                                                        makeHex={this.makeHex}
                                                                        cancelColor={this.cancelColor}
                                                                        red={this.state.red}
                                                                        green={this.state.green}
                                                                        blue={this.state.blue}/>  
        return(
            <div ref={ (el) => this.ColorChanger = el}>
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