import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Steps, message, Spin} from 'antd';

import CustomButton from "../../components/common/custom-button/CustomButton";
import UserSignupForm from "../../components/signup/UserSignupForm";
import UserRegistrationForm from "../../components/signup/UserRegistrationForm";
import { useSignupMutation, useRegisterMutation } from "../../slicers/authSlice";

import './SignupScreen.css';

const { Step } = Steps;

const steps = [
    {
        title: 'User Signup',
        component: UserSignupForm,
    },
    {
        title: 'User Registration',
        component: UserRegistrationForm,
    }
];

const SignupScreen = () => {
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        phoneNumber: '',
        email: '',
        password: '',
        reEnterPassword: '',

        name: '',
        qualifications: '',
        address: '',
        registrationNumber: '',
        instituteName: '',
        otherDetails: ''
    });

    const [isFieldError, setIsFieldError] = useState({
        isPhoneNumberError: false,
        isEmailError: false,
        isPasswordError: false,

        isNameError: false,
        isQualificationError: false,
        isAddressError: false,
        isRegistrationNumberError: false,
        isInstituteNameError: false
    });

    const [signup, { isLoading: signupIsLoading }] = useSignupMutation();
    const [register, { isLoading: registrationIsLoading }] = useRegisterMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    }

    const handleNext = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneNumberValidity = formData.phoneNumber.trim().length > 8;
        const passwordValidity = formData.password.trim().length >= 5 && formData.password === formData.reEnterPassword;
        const emailValidity = emailRegex.test(formData.email.trim());

        setIsFieldError({
            ...isFieldError,
            isEmailError: false,
            isPasswordError: false,
            isPhoneNumberError: false
        });

        if(phoneNumberValidity && passwordValidity && emailValidity){
            try {
                const res = await signup({
                    phoneNumber: formData.phoneNumber,
                    email: formData.email,
                    password: formData.password
                }).unwrap();

                message.success(res?.message);
                setCurrentStep(currentStep + 1);
            }catch (error){
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                ...isFieldError,
                isEmailError: !emailValidity,
                isPasswordError: !passwordValidity,
                isPhoneNumberError: !phoneNumberValidity
            });
        }
    }

    const handleSubmit = async () => {
        const nameValidity = formData.name.trim().length >= 3;
        const qualificationValidity = formData.qualifications.trim().length >= 5;
        const addressValidity = formData.address.trim().length >= 6;
        const registrationNumberValidity = formData.registrationNumber.trim().length >= 6;
        const instituteNameValidity = formData.instituteName.trim().length >= 3;

        if(nameValidity && qualificationValidity && addressValidity && registrationNumberValidity && instituteNameValidity){
            try {
                const res = await register({
                    name: formData.name,
                    qualification: formData.qualifications,
                    address: formData.address,
                    registrationNumber: formData.registrationNumber,
                    instituteName: formData.instituteName,
                    otherDetails: formData.otherDetails
                }).unwrap();

                message.success(res?.message);
                navigate('/');
            }catch (error) {
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                ...isFieldError,
                isInstituteNameError: !instituteNameValidity,
                isAddressError: !addressValidity,
                isRegistrationNumberError: !registrationNumberValidity,
                isQualificationError: !qualificationValidity,
                isNameError: !nameValidity
            });
        }
    }

    const CurrentStepComponent = steps[currentStep].component;

    if(signupIsLoading && registrationIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'signup-screen'}>
                <div className={'signup-screen-container'}>
                    <p className={'signup-screen-title'}>Signup</p>
                    <p className={'signup-screen-description'}>Create new account !</p>
                    <div>
                        {<CurrentStepComponent onChange={handleChange} formData={formData} isFieldError={isFieldError}/>}
                    </div>
                    <div>
                        <Steps progressDot current={currentStep} className="custom-steps">
                            {steps.map((step) => (
                                <Step key={step.title} title={step.title} style={{color: '#f0f0f0'}}/>
                            ))}
                        </Steps>
                    </div>
                    <div className={'create-drivers-screen-button-container'}>
                        {currentStep !== 0 && <CustomButton title={'Previous'} isSmall={true}
                                                            onClick={handlePrevious} bgColor={'transparent'}
                                                            fontColor={'#f0f0f0'}/>}
                        {currentStep < steps.length - 1 ? (
                            <CustomButton title={'Next'} onClick={handleNext} bgColor={'#112732'} fontColor={'#f0f0f0'}
                                          isSmall={true}/>
                        ) : (
                            <CustomButton title={'Submit'} onClick={handleSubmit} bgColor={'#112732'}
                                          fontColor={'#f0f0f0'} isSmall={true}/>
                        )}
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupScreen;