import React from "react";
import { ImCancelCircle } from "react-icons/im";

import './AnalysisFilterbar.css';

const AnalysisFilterbar = ({ endDateChange, startDateChange, onFilterClearClick, startDate, endDate }) => {
    const today = new Date().toISOString().split('T')[0];

    return(
        <div className={'analysis-filter-bar'}>
            <input type={'date'} id={'date'} className={'custom-filter-input'} value={startDate} onChange={startDateChange}
                   placeholder={'Select starting date'} max={today}/>
            <input type={'date'} id={'date'} className={'custom-filter-input'} value={endDate} onChange={endDateChange}
                   placeholder={'Select starting date'} max={today}/>
            <ImCancelCircle onClick={onFilterClearClick} className={'custom-analysis-filter-bar-icon custom-filter-bar-clear-icon'}/>
        </div>
    )
}

export default AnalysisFilterbar;