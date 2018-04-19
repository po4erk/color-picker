import React from 'react';

const DropdownSlider = ({updateColor,fullColorHex,cancelColor,red,green,blue}) => {
    const style = {background: `rgb(${red},${green},${blue})`};
    const rgb = [{name: 'R', color: red, id: 'red'},
                 {name: 'G', color: green, id: 'green'},
                 {name: 'B', color: blue, id: 'blue'}];

    const rgbInputs = rgb.map((rgb) => 
        <div className="input_range" key={rgb.id}>
            <label htmlFor={rgb.id} className="input_range">{rgb.name}</label>
            <input id={rgb.id} className="input_range" type="range" min="0" max="255" steps="1" value={rgb.color}
                onChange={updateColor} />
        </div>);

    return(
        <div className='dropdown_slider'>
        <div className='dropdown_color' style={style}></div>
            {rgbInputs}
            <button className="btnOk" onClick={fullColorHex}>OK</button>
            <button className="btnCancel" onClick={cancelColor}>CANCEL</button>
        </div>
    )
}

export default DropdownSlider;