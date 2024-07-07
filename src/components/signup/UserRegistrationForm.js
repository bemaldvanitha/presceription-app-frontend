import React from 'react';

import CustomInput from "../common/custom-input/CustomInput";
import CustomTextArea from "../common/custom-text-area/CustomTextArea";

const UserRegistrationForm = ({ onChange, formData, isFieldError }) => {

    const nameChangeHandler = (e) => {
        onChange('name', e.target.value);
    }

    const qualificationsChangeHandler = (e) => {
        onChange('qualifications', e.target.value);
    }

    const addressChangeHandler = (e) => {
        onChange('address', e.target.value);
    }

    const registrationNumberChangeHandler = (e) => {
        onChange('registrationNumber', e.target.value);
    }

    const instituteNameChangeHandler = (e) => {
        onChange('instituteName', e.target.value);
    }

    const otherDetailsChangeHandler = (e) => {
        onChange('otherDetails', e.target.value);
    }

    return(
        <div>
            <CustomInput title={'Name'} id={'name'} value={formData.name} type={'text'} isError={isFieldError.isNameError}
                         placeholder={'Enter name'} onChangeHandle={nameChangeHandler} errorMessage={'Enter valid name'}/>
            <CustomInput title={'Qualifications'} id={'qualifications'} value={formData.qualifications} type={'text'}
                         isError={isFieldError.isQualificationError} placeholder={'Enter qualifications'}
                         onChangeHandle={qualificationsChangeHandler} errorMessage={'Enter valid qualifications'}/>
            <CustomTextArea id={'address'} onChangeHandle={addressChangeHandler} errorMessage={'Enter valid address'}
                            isError={isFieldError.isAddressError} value={formData.address} placeholder={'Enter address'}
                            title={'Address'}/>
            <CustomInput title={'Registration Number'} id={'registrationNumber'} value={formData.registrationNumber} type={'text'}
                         isError={isFieldError.isRegistrationNumberError} placeholder={'Enter registration number'}
                         onChangeHandle={registrationNumberChangeHandler} errorMessage={'Enter valid registration number'}/>
            <CustomInput title={'Institute Name'} id={'instituteName'} value={formData.instituteName} type={'text'}
                         isError={isFieldError.isInstituteNameError} placeholder={'Enter institute name'}
                         onChangeHandle={instituteNameChangeHandler} errorMessage={'Enter valid institute name'}/>
            <CustomTextArea id={'otherDetails'} onChangeHandle={otherDetailsChangeHandler} errorMessage={''} isError={false}
                            value={formData.otherDetails} placeholder={'Enter other details'} title={'Other details'}/>
        </div>
    )
}

export default UserRegistrationForm;