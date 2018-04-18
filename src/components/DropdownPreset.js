import React from 'react';

function DropdownPreset(props){
    let {colors,getHex} = props;
    return(
        <div className='dropdown_preset'>
            <div className='red' data-color={colors.red} onClick={getHex}>Red</div>
            <div className='yellow' data-color={colors.yellow} onClick={getHex}>Yellow</div>
            <div className='green' data-color={colors.green} onClick={getHex}>Green</div>
            <div className='blue' data-color={colors.blue} onClick={getHex}>Blue</div>
        </div>
    )
}

export default DropdownPreset;