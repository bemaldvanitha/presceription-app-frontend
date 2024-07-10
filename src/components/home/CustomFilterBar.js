import React from 'react';
import { FaSearch, FaFilter  } from "react-icons/fa";
import { ImCancelCircle } from "react-icons/im";

import './CustomFilterBar.css';

const CustomFilterBar = ({ onFilterClick, onClearFilterClick, onSearchClick, searchTerm, onSearchTermChange,
                             onSelectedDayChange, selectedDay }) => {

    const today = new Date().toISOString().split('T')[0];

    return(
        <div className={'custom-filter-bar'}>
            <div className={'custom-filter-bar-left-container'}>
                <input type={'text'} id={'search'} className={'custom-input'} value={searchTerm} onChange={onSearchTermChange}
                       placeholder={'Enter search keyword...'}/>
                <FaSearch onClick={onSearchClick} className={'custom-filter-bar-icon custom-filter-bar-search-icon'}/>
            </div>
            <div className={'custom-filter-bar-right-container'}>
                <FaFilter onClick={onFilterClick} className={'custom-filter-bar-icon custom-filter-bar-filter-icon'}/>
                <input type={'date'} id={'date'} className={'custom-input'} value={selectedDay} onChange={onSelectedDayChange}
                       placeholder={'Select a date'} max={today}/>
                <ImCancelCircle onClick={onClearFilterClick} className={'custom-filter-bar-icon custom-filter-bar-clear-icon'}/>
            </div>
        </div>
    )
}

export default CustomFilterBar;