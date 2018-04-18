import React from 'react';

function DropdownSlider(props){
    let {updateColor,fullColorHex,cancelColor,red,green,blue} = props;
    let style = {background: `rgb(${red},${green},${blue})`};
    return(
        
        <div className='dropdown_slider'>
        <div className='dropdown_color' style={style}></div>
            <div className="input_range">
                <label htmlFor="red" className="input_range">R</label>
                <input id="red" className="input_range" type="range" min="0" max="255" steps="1" value={red}
                    onChange={updateColor} />
            </div>
            <div className='input_range'>
                <label htmlFor="green" className="input_range">G</label>
                <input id="green" className="input_range" type="range" min="0" max="255" steps="1" value={green}
                    onChange={updateColor} />
            </div>
            <div className='input_range'>
                <label htmlFor="blue" className="input_range">B</label>
                <input id="blue" className="input_range" type="range" min="0" max="255" steps="1" value={blue}
                    onChange={updateColor} />
            </div>
            <button className="btnOk" onClick={fullColorHex}>OK</button>
            <button className="btnCancel" onClick={cancelColor}>CANCEL</button>
        </div>
    )
}

export default DropdownSlider;