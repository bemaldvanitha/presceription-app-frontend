import React, {useEffect, useState} from 'react';
import { Spin } from "antd";

import CustomLineChart from "../../components/analysis/CustomLineChart";
import AnalysisFilterbar from "../../components/analysis/AnalysisFilterbar";
import { useGetPrescriptionAnalyticsQuery } from "../../slicers/prescriptionSlice";

import './AnalysisScreen.css';

const AnalysisScreen = () => {
    const [startDate, setStartDate] = useState( new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [chartData, setChartData] = useState({});

    const { data: analysisData, isLoading: analysisDataIsLoading, error: analysisDataError } = useGetPrescriptionAnalyticsQuery(
        { startDate, endDate }, { skip: !startDate || !endDate });

    useEffect(() => {
        if( analysisData && analysisData.length !== 0){
            const transformedData = analysisData.map(item => ({
                x: new Date(item.data).getTime(),
                y: item.count
            }));
            setChartData(transformedData);
        }
    }, [analysisData]);

    const startDateChangeHandler = (e) => {
        setStartDate(e.target.value);
    }

    const endDateChangeHandler = (e) => {
        setEndDate(e.target.value);
    }

    const onFilterClearClickHandler = () => {
        setStartDate('');
        setEndDate('');
        setChartData({});
    }

    if(analysisDataIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'analysis-screen'}>
                <AnalysisFilterbar startDate={startDate} endDate={endDate} startDateChange={startDateChangeHandler}
                                   endDateChange={endDateChangeHandler} onFilterClearClick={onFilterClearClickHandler}/>
                <CustomLineChart data={chartData}/>
            </div>
        )
    }
}

export default AnalysisScreen;