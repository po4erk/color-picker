import React from 'react';
import colors from '../../constants'

const DropdownPreset = ({getHex}) => {
    const colorsBox = colors.map(({color, hex}) => 
        <div className={color} data-color={hex} key={hex} onClick={getHex}>{color}</div>
    )
    return(
        <div className='dropdown_preset'>
            {colorsBox}
        </div>
    )
}

export default DropdownPreset;