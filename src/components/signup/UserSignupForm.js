import React from 'react';

import CustomInput from "../common/custom-input/CustomInput";

const UserSignupForm = ({ onChange, formData, isFieldError }) => {

    const phoneNumberChangeHandler = (e) => {
        onChange('phoneNumber', e.target.value);
    }

    const emailChangeHandler = (e) => {
        onChange('email', e.target.value);
    }

    const passwordChangeHandler = (e) => {
        onChange('password', e.target.value);
    }

    const reEnterPasswordChangeHandler = (e) => {
        onChange('reEnterPassword', e.target.value);
    }

    return(
        <div>
            <CustomInput title={'Phone Number'} id={'phoneNumber'} value={formData.phoneNumber} type={'tel'}
                         isError={isFieldError.isPhoneNumberError} placeholder={'Enter phone number'}
                         onChangeHandle={phoneNumberChangeHandler} errorMessage={'Enter valid phone number'}/>
            <CustomInput title={'Email'} id={'email'} value={formData.email} type={'email'} errorMessage={'Enter valid email'}
                         isError={isFieldError.isEmailError} placeholder={'Enter email'} onChangeHandle={emailChangeHandler}/>
            <CustomInput title={'Password'} id={'password'} value={formData.password} type={'password'}
                         errorMessage={'Enter valid password (password should be at least 5 chars and should equal to confirm ' +
                             'password)'} isError={isFieldError.isPasswordError} placeholder={'Enter password'}
                         onChangeHandle={passwordChangeHandler}/>
            <CustomInput title={'Confirm Password'} id={'rePassword'} value={formData.reEnterPassword} type={'password'}
                         errorMessage={'Enter valid password (password should be at least 5 chars and should equal to confirm ' +
                             'password)'} isError={isFieldError.isPasswordError} placeholder={'Re-Enter password'}
                         onChangeHandle={reEnterPasswordChangeHandler}/>
        </div>
    )
}

export default UserSignupForm;