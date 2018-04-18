import React, { Component } from 'react';
import ColorChanger from './ColorChanger';

class ColorPicker extends Component{
    render(){
        let colors = {
            yellow: '#ffce35',
            red: '#ed1d24',
            green: '#00a651',
            blue: '#00aeef'
        }
        return(
            <div className='color_picker'>
                <ColorChanger colors={colors}/>
            </div>
        )
    }
}
export default ColorPicker;