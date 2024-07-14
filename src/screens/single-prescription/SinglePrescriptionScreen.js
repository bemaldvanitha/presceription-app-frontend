import React from 'react';
import { useParams } from "react-router-dom";
import { Spin } from "antd";

import { useGetSinglePrescriptionQuery } from "../../slicers/prescriptionSlice";

import './SinglePrescriptionScreeen.css';

const SinglePrescriptionScreen = () => {
    const id = useParams().id;

    const { data: prescriptionData, isLoading: prescriptionDataIsLoading, error: prescriptionDataError } =
        useGetSinglePrescriptionQuery(id);

    if(prescriptionDataIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'single-prescription-screen'}>
                <p className={'single-prescription-screen-title'}>Prescription</p>
                <div className={'single-prescription-screen-main-container'}>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Patient Name</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.patientName}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Age</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.age}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Issued At</p>
                        <p className={'single-prescription-screen-box-desc'}>{new Date(prescriptionData?.createdAt).toDateString()}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Gender</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.gender}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Mobile Number</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.mobileNumber}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Address</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.address}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Height</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.height} {prescriptionData?.heightUnit}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Weight</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.weight} {prescriptionData?.weightUnit}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Diagnosis</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.diagnosis}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Patient Complains</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.patientComplains}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Clinical Features</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.clinicalFeatures}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Examination</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.examination}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Advice</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.advice}</p>
                    </div>
                    <div className={'single-prescription-screen-box'}>
                        <p className={'single-prescription-screen-box-title'}>Notes</p>
                        <p className={'single-prescription-screen-box-desc'}>{prescriptionData?.notes}</p>
                    </div>
                </div>
                <div className={'single-prescription-screen-sub-container'}>
                    <table className={'single-prescription-screen-table'}>
                        <thead>
                        <tr>
                            <th className={'single-prescription-screen-table-header'}>Drug Name</th>
                            <th className={'single-prescription-screen-table-header'}>Strength</th>
                            <th className={'single-prescription-screen-table-header'}>Dose</th>
                            <th className={'single-prescription-screen-table-header'}>Duration</th>
                            <th className={'single-prescription-screen-table-header'}>Preparation</th>
                            <th className={'single-prescription-screen-table-header'}>Route</th>
                            <th className={'single-prescription-screen-table-header'}>Direction</th>
                            <th className={'single-prescription-screen-table-header'}>Frequency</th>
                            <th className={'single-prescription-screen-table-header'}>Total Quantity</th>
                            <th className={'single-prescription-screen-table-header'}>Other Instructions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {prescriptionData?.drugs.map((drug, index) => {
                            return <tr key={index}>
                                <td className={'single-prescription-screen-table-data'}>{drug?.drugName}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.strength} {drug?.drugStrengthUnit}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.dose} {drug?.doseUnit}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.duration} {drug?.duration}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.preparation}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.route}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.direction}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.frequency}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.totalQuantity}</td>
                                <td className={'single-prescription-screen-table-data'}>{drug?.otherInstructions}</td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}

export default SinglePrescriptionScreen;