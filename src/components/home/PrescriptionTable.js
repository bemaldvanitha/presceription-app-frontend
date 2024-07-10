import React from 'react';

import './PrescriptionTable.css';

const PrescriptionTable = ({ prescriptions, handleSinglePrescriptionClick }) => {
    return (
        <table className={'prescription-table'}>
            <thead>
            <tr className={'prescription-table-header-row'}>
                <th className={'prescription-table-header'}>Id</th>
                <th className={'prescription-table-header'}>Patient Name</th>
                <th className={'prescription-table-header'}>Mobile Number</th>
                <th className={'prescription-table-header'}>Age</th>
                <th className={'prescription-table-header'}>Created At</th>
            </tr>
            </thead>
            <tbody>
            {prescriptions && prescriptions.map((prescription, index) => {
                return (
                    <tr key={index} className={'prescription-table-row'} onClick={() =>
                            handleSinglePrescriptionClick(prescription?.id)}>
                        <td className={'prescription-table-data'}>{prescription?.id}</td>
                        <td className={'prescription-table-data'}>{prescription?.patientName}</td>
                        <td className={'prescription-table-data'}>{prescription?.mobileNumber}</td>
                        <td className={'prescription-table-data'}>{prescription?.age}</td>
                        <td className={'prescription-table-data'}>{prescription?.createdAt}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default PrescriptionTable;