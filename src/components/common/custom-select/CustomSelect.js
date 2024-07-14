import React from 'react';

import './CustomSelect.css';

const CustomSelect = ({ id, isError, errorMessage, title, value, onChangeHandle, options, isSmall = false }) => {
    return(
        <div className={`custom-select-container ${isSmall && 'custom-select-small-container'}`}>
            <label className={'custom-select-label'}>
                {title}
            </label>
            <select id={id} value={value} onChange={onChangeHandle} className={'custom-select'}>
                <option value="" hidden>{title}</option>
                {options.map((option, index) => <option value={option} key={index}>{option}</option>)}
            </select>
            {isError && <p className={'custom-select-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomSelect;