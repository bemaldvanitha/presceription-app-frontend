import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message, Spin } from "antd";

import CustomInput from "../../components/common/custom-input/CustomInput";
import CustomButton from "../../components/common/custom-button/CustomButton";
import { useLoginMutation } from "../../slicers/authSlice";

import './LoginScreen.css';

const LoginScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobileNumber: '',
        password: ''
    });

    const [isFormError, setIsFormError] = useState({
        isMobileNumberError: false,
        isPasswordError: false
    });

    const [login, { isLoading }] = useLoginMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const mobileNumberChangeHandler = (e) => {
        handleChange('mobileNumber', e.target.value);
    }

    const passwordChangeHandler = (e) => {
        handleChange('password', e.target.value);
    }

    const loginHandler = async () => {
        const mobileNumberValidity = formData.mobileNumber.trim().length > 8;
        const passwordValidity = formData.password.trim().length >= 5;

        setIsFormError({
            isMobileNumberError: false,
            isPasswordError: false
        });

        if(mobileNumberValidity && passwordValidity){
            try{
                const res = await login({
                    mobileNumber: formData.mobileNumber,
                    password: formData.password
                }).unwrap();

                message.success(res?.message);

                navigate('/');
            }catch (error){
                message.error(error?.data?.message);
            }
        }else {
            setIsFormError({
                isMobileNumberError: !mobileNumberValidity,
                isPasswordError: !passwordValidity
            });
        }
    }

    const signupNavigateHandler =  () => {
        navigate('/signup');
    }

    if(isLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'login-screen'}>
                <div className={'login-screen-container'}>
                    <p className={'login-screen-title'}>Login</p>
                    <p className={'login-screen-description'}>Welcome back !</p>
                    <CustomInput value={formData.mobileNumber} type={'tel'} id={'mobileNumber'} title={'Enter Mobile Number'}
                                 onChangeHandle={mobileNumberChangeHandler} errorMessage={'Enter valid mobile number'}
                                 isError={isFormError.isMobileNumberError} placeholder={'Please enter mobile number'}/>
                    <CustomInput value={formData.password} onChangeHandle={passwordChangeHandler}  type={'password'} id={'password'}
                                 isError={isFormError.passwordError} placeholder={'Please enter password'} title={'Enter Password'}
                                 errorMessage={'Please enter valid password (password must be more that 5 chars)'}/>
                    <CustomButton title={'Login'} fontColor={'#f0f0f0'} bgColor={'#AF47D2'} onClick={loginHandler}/>
                    <div className={'login-screen-signup-navigate-container'}>
                        <p className={'login-screen-signup-navigate-container-text'}>Don't have an account</p>
                        <p onClick={signupNavigateHandler} className={'login-screen-signup-navigate-container-text-link'}>Signup!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen;