import React from 'react';
import colors from '../constants'

const DropdownPreset = ({getHex}) => {
    const colorsBox = colors.map((colors) => 
        <div className={colors.color} data-color={colors.hex} key={colors.hex} onClick={getHex}>{colors.color}</div>
    )
    return(
        <div className='dropdown_preset'>
            {colorsBox}
        </div>
    )
}

export default DropdownPreset;