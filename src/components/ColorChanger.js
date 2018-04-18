import React, { Component } from 'react';
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
        document.addEventListener('click',(e) => {
            let target = e.target.className;
            if(target !== 'dropdown' && target !== 'color' &&
               target !== 'dropdown_slider' && target !== 'input_range') 
            this.setState({
                isOpenPreset: false,
                isOpenSlider: false
            });
        });
    }
    
    getHex = (e) => {
        let hex = e.target.dataset.color;
        this.setState({
            hex: hex
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
        let target = e.target.id;
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
        if(this.state.isOpenSlider){
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                hex: this.state.hex
            });
        }
    };
    hexToRgb = () => {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(this.state.hex);
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
        let red = this.rgbToHex(this.state.red);
        let green = this.rgbToHex(this.state.green);
        let blue = this.rgbToHex(this.state.blue);
        let rgb = `#${red}${green}${blue}`;
        if(this.state.isOpenSlider)
            this.setState({
                isOpenSlider: !this.state.isOpenSlider,
                hex: rgb
            });
    };
    render(){
        let {colors} = this.props;
        const style = {backgroundColor: this.state.hex}
        const colorPresets = this.state.isOpenPreset && <DropdownPreset colors = {colors} 
                                                                        getHex={this.getHex}/>
        const colorSliders = this.state.isOpenSlider && <DropdownSlider updateColor={this.updateColor}
                                                                        fullColorHex={this.fullColorHex}
                                                                        cancelColor={this.cancelColor}
                                                                        red={this.state.red}
                                                                        green={this.state.green}
                                                                        blue={this.state.blue}/>  
        return(
            <div>
                <div className='color_hex'>{this.state.hex.toUpperCase()}</div>
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