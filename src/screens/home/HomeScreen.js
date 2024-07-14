import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

import CustomFilterBar from "../../components/home/CustomFilterBar";
import PrescriptionTable from "../../components/home/PrescriptionTable";
import CustomButton from "../../components/common/custom-button/CustomButton";
import { useGetAllPrescriptionQuery, useSearchPrescriptionQuery, useFilterPrescriptionQuery } from "../../slicers/prescriptionSlice";

import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();

    const [searchTerm, setSelectedSearchTerm] = useState('');
    const [selectedDate, setSelectedDate] = useState('2024-05-07');
    const [prescriptions, setPrescriptions] = useState([]);

    const { data: allPrescriptionData, isLoading: allPrescriptionIsLoading, refetch, error: allPrescriptionError } =
        useGetAllPrescriptionQuery();
    const { data: searchedPrescriptionData, isLoading: searchedPrescriptionIsLoading, error: searchedPrescriptionError } =
        useSearchPrescriptionQuery(searchTerm);
    const { data: filteredPrescriptionData, isLoading: filteredPrescriptionIsLoading, error: filteredPrescriptionError } =
        useFilterPrescriptionQuery(selectedDate);

    useEffect(() => {
        if(allPrescriptionData){
            setPrescriptions(allPrescriptionData)
        }
    }, [allPrescriptionData]);

    const selectedDateChangeHandler = (e) => {
        setSelectedDate(e.target.value);
    }

    const searchTermChangeHandler = (e) => {
        setSelectedSearchTerm(e.target.value);
    }

    const searchClickHandler = () => {
        if(searchedPrescriptionData){
            setPrescriptions(searchedPrescriptionData);
        }
    }

    const filterClickHandler = () => {
        if(filteredPrescriptionData){
            setPrescriptions(filteredPrescriptionData)
        }
    }

    const clearFilterClickHandler = () => {
        refetch();
    }

    const addPrescriptionNavigateHandler = () => {
        navigate('/add-prescription');
    }

    const handleSinglePrescriptionClick = (id) => {

    }

    if(allPrescriptionIsLoading || searchedPrescriptionIsLoading || filteredPrescriptionIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'home-screen'}>
                <CustomFilterBar searchTerm={searchTerm} selectedDay={selectedDate} onSearchTermChange={searchTermChangeHandler}
                                 onSelectedDayChange={selectedDateChangeHandler} onSearchClick={searchClickHandler}
                                 onFilterClick={filterClickHandler} onClearFilterClick={clearFilterClickHandler}/>
                <div className={'home-screen-button-container'}>
                    <CustomButton onClick={addPrescriptionNavigateHandler} title={'Add Prescription'} bgColor={'#44ccdb'}
                                  fontColor={'#f0f0f0'}/>
                </div>
                <div className={'home-screen-container'}>
                    <PrescriptionTable prescriptions={prescriptions} handleSinglePrescriptionClick={handleSinglePrescriptionClick}/>
                </div>
            </div>
        )
    }
}

export default HomeScreen;