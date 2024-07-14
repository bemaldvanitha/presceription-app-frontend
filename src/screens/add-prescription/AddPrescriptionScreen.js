import React, {useState} from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/common/custom-input/CustomInput";
import CustomSelect from "../../components/common/custom-select/CustomSelect";
import CustomTextArea from "../../components/common/custom-text-area/CustomTextArea";
import CustomButton from "../../components/common/custom-button/CustomButton";
import { directionOptions, doseUnitOptions, drugStrengthUnitOptions, durationUnitOptions, frequencyOptions, genderOptions,
    heightUnitOptions, preparationOptions, routeOptions, weightUnitOptions } from '../../data/data';
import { useAddPrescriptionMutation } from "../../slicers/prescriptionSlice";

import './AddPrescriptionScreen.css';

const AddPrescriptionScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        patientName: '',
        dateOfBirth: '',
        age: 0,
        gender: '',
        mobileNumber: '',
        address: '',
        height: 0,
        heightUnit: '',
        weight: 0,
        weightUnit: '',
        diagnosis: '',
        patientComplains: '',
        clinicalFeatures: '',
        examination: '',
        advice: '',
        notes: '',
        isNoteIncluded: true,
        drugs: []
    });

    const [isFieldError, setIsFieldError] = useState({
        isPatientNameError: false,
        isDateOfBirthError: false,
        isGenderError: false,
        isMobileNumberError: false,
        isAddressError: false,
        isHeightError: false,
        isHeightUnitError: false,
        isWeightError: false,
        isWeightUnitError: false,
        isDiagnosisError: false,
        isPatientComplainsError: false,
        isClinicalFeaturesError: false,
        drugsError: []
    });

    const [addPrescription, { isLoading }] = useAddPrescriptionMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const handleErrorChange = (field, value) => {
        setIsFieldError((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const patientNameChangeHandler = (e) => {
        handleChange('patientName', e.target.value)
    }

    const dateOfBirthChangeHandler = (e) => {
        handleChange('dateOfBirth', e.target.value);

        const selectedDateString = e.target.value;
        const selectedDate = new Date(selectedDateString);
        const today = new Date();
        let yearDifference = today.getFullYear() - selectedDate.getFullYear();

        if (selectedDate.getMonth() > today.getMonth() || (selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() > today.getDate())) {
            yearDifference--;
        }

        handleChange('age', yearDifference);
    }

    const genderChangeHandler = (e) => {
        handleChange('gender', e.target.value);
    }

    const mobileNumberChangeHandler = (e) => {
        handleChange('mobileNumber',e.target.value);
    }

    const addressChangeHandler = (e) => {
        handleChange('address',e.target.value);
    }

    const heightChangeHandler = (e) => {
        handleChange('height',e.target.value);
    }

    const heightUnitChangeHandler = (e) => {
        handleChange('heightUnit',e.target.value);
    }

    const weightChangeHandler = (e) => {
        handleChange('weight',e.target.value);
    }

    const weightUnitChangeHandler = (e) => {
        handleChange('weightUnit',e.target.value);
    }

    const diagnosisChangeHandler = (e) => {
        handleChange('diagnosis',e.target.value);
    }

    const patientComplainsChangeHandler = (e) => {
        handleChange('patientComplains',e.target.value);
    }

    const clinicalFeaturesChangeHandler = (e) => {
        handleChange('clinicalFeatures',e.target.value);
    }

    const examinationChangeHandler = (e) => {
        handleChange('examination',e.target.value);
    }

    const adviceChangeHandler = (e) => {
        handleChange('advice',e.target.value);
    }

    const notesChangeHandler = (e) => {
        handleChange('notes',e.target.value);
    }

    const addDrugHandler = () => {
        const drugList = [...formData.drugs];
        drugList.push({ drugName: '', strength: 0, drugStrengthUnit: '', dose: 0, doseUnit: '', preparation: '', route: '',
            direction: '', frequency: '', duration: 0, durationUnit: '', totalQuantity: 0, otherInstructions: '' });
        handleChange('drugs', drugList);

        const drugsError = [...isFieldError.drugsError];
        drugsError.push({ isDrugNameError: false, isStrengthError: false, isDrugStrengthUnitError: false, isDoseError: false,
            isDoseUnitError: false, isPreparationError: false, isRouteError: false, isDirectionError: false, isFrequencyError: false,
            isDurationError: false, isDurationUnitError: false, isTotalQuantityError: false });
        handleErrorChange('drugsError', drugsError);
    }

    const drugValuesChangeHandler = (e, idx, changeItem) => {
        const updatedDrugs = [...formData.drugs];
        updatedDrugs[idx][changeItem] = e.target.value;
        handleChange('drugs', updatedDrugs);
    }

    const submitHandler = async () => {
        const patientNameValidity = formData.patientName.trim().length >= 3;
        const dateOfBirthValidity = formData.dateOfBirth.trim().length > 3;
        const genderValidity =  formData.gender.trim().length !== 0;
        const mobileNumberValidity = formData.mobileNumber.trim().length >= 7;
        const addressValidity = formData.address.trim().length >= 3;
        const heightValidity = !isNaN(formData.height) && parseFloat(formData.height) > 0;
        const heightUnitValidity = formData.heightUnit.trim().length !== 0;
        const weightValidity= !isNaN(formData.weight) && parseFloat(formData.weight) > 0;
        const weightUnitValidity = formData.weightUnit.trim().length !== 0;
        const diagnosisValidity = formData.diagnosis.trim().length > 4;
        const patientComplainsValidity=  formData.patientComplains.trim().length > 4;
        const clinicalFeaturesValidity = formData.clinicalFeatures.trim().length > 4;

        let drugValidity = true;
        let drugValidityObj = isFieldError.drugsError;

        for(let [drugItem, index] of formData.drugs.entries()){
            if(drugItem.toString().trim().length === 0){
                drugValidity = false;
                drugValidityObj[index][drugItem] = !drugValidityObj[index][drugItem];
            }
        }

        if(patientComplainsValidity && patientNameValidity && dateOfBirthValidity && genderValidity && mobileNumberValidity &&
            addressValidity && heightUnitValidity && heightValidity && weightUnitValidity && weightValidity && diagnosisValidity
            && clinicalFeaturesValidity){
            try{
                const res = await addPrescription({
                    ...formData,
                    createdAt: new Date(),
                }).unwrap();

                let url = res?.url;

                if (url) {
                    let message = `This is your prescription: ${url}`;
                    let encodedMessage = encodeURIComponent(message);

                    window.open(`https://wa.me/${formData.mobileNumber}?text=${encodedMessage}`, '_blank');
                }

                message.success(res?.message);
                navigate('/');
            }catch (error){
                console.log(error);
                message.error(error?.data?.message)
            }
        }else {
            setIsFieldError({
                drugsError: drugValidityObj,
                isPatientNameError: !patientNameValidity,
                isDateOfBirthError: !dateOfBirthValidity,
                isGenderError: !genderValidity,
                isMobileNumberError: !mobileNumberValidity,
                isAddressError: !addressValidity,
                isHeightError: !heightValidity,
                isHeightUnitError: !heightUnitValidity,
                isWeightError: !weightValidity,
                isWeightUnitError: !weightUnitValidity,
                isDiagnosisError: !diagnosisValidity,
                isPatientComplainsError: !patientComplainsValidity,
                isClinicalFeaturesError: !clinicalFeaturesValidity
            });
        }
    }

    if(isLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'add-prescription-screen'}>
                <div className={'add-prescription-screen-container'}>
                    <CustomInput value={formData.patientName} title={'Enter Patient Name'} placeholder={'Please enter patient name'}
                                 id={'patientName'} type={'text'} isError={isFieldError.isPatientNameError}
                                 errorMessage={'Enter valid patient name'} onChangeHandle={patientNameChangeHandler}/>
                    <CustomInput value={formData.dateOfBirth} errorMessage={'Select valid date of birth'} id={'dateOfBirth'}
                                 onChangeHandle={dateOfBirthChangeHandler} type={'date'} isError={isFieldError.isDateOfBirthError}
                                 placeholder={'Select date og birth'} title={'Select Date of Birth'}/>
                    <CustomSelect value={formData.gender} id={'gender'} title={'Select Gender'} isError={isFieldError.isGenderError}
                                  onChangeHandle={genderChangeHandler} errorMessage={'Select gender'} options={genderOptions}/>
                    <CustomInput value={formData.mobileNumber} onChangeHandle={mobileNumberChangeHandler}
                                 id={'mobileNumber'} errorMessage={'Enter valid mobile number'}
                                 isError={isFieldError.isMobileNumberError} type={'tel'} title={'Enter Mobile Number'}
                                 placeholder={'Enter mobile number'}/>
                    <CustomTextArea title={'Enter Address'} id={'address'} onChangeHandle={addressChangeHandler}
                                    placeholder={'Enter address'} value={formData.address}
                                    isError={isFieldError.isAddressError} errorMessage={'Enter valid address'}/>
                    <div className={'add-prescription-column'}>
                        <CustomInput value={formData.height} id={'height'} type={'number'} errorMessage={'Enter valid height'}
                                     isError={isFieldError.isHeightError} title={'Enter Height'} placeholder={'Enter height'}
                                     onChangeHandle={heightChangeHandler} isSmall={true}/>
                        <CustomSelect value={formData.heightUnit} id={'heightUnit'} onChangeHandle={heightUnitChangeHandler}
                                      title={'Select Height Unit'} isError={isFieldError.isHeightUnitError}
                                      errorMessage={'Select height unit'} options={heightUnitOptions} isSmall={true}/>
                    </div>
                    <div className={'add-prescription-column'}>
                        <CustomInput value={formData.weight} id={'weight'} type={'number'} errorMessage={'Enter valid weight'}
                                     isError={isFieldError.isWeightError} title={'Enter Weight'} placeholder={'Enter weight'}
                                     onChangeHandle={weightChangeHandler} isSmall={true}/>
                        <CustomSelect value={formData.weightUnit} id={'weightUnit'} onChangeHandle={weightUnitChangeHandler}
                                      title={'Select Weight Unit'} isError={isFieldError.isWeightUnitError}
                                      errorMessage={'Select weight unit'} options={weightUnitOptions} isSmall={true}/>
                    </div>
                    <CustomTextArea value={formData.diagnosis} id={'diagnosis'} errorMessage={'Enter valid diagnosis'}
                                    isError={isFieldError.isDiagnosisError} title={'Enter Diagnosis'} onChangeHandle={diagnosisChangeHandler}
                                    placeholder={'Enter diagnosis information'}/>
                    <CustomTextArea value={formData.patientComplains} id={'patientComplains'} errorMessage={'Enter valid patient complains'}
                                    isError={isFieldError.isPatientComplainsError} title={'Enter Patient Complains'}
                                    onChangeHandle={patientComplainsChangeHandler} placeholder={'Enter patient complains'}/>
                    <CustomTextArea value={formData.clinicalFeatures} id={'clinicalFeatures'} errorMessage={'Enter valid clinical features'}
                                    isError={isFieldError.isClinicalFeaturesError} title={'Enter Clinical Features'}
                                    onChangeHandle={clinicalFeaturesChangeHandler} placeholder={'Enter clinical features'}/>
                    <CustomTextArea value={formData.examination} id={'examination'} errorMessage={''} isError={false}
                                    title={'Enter Examination'} onChangeHandle={examinationChangeHandler}
                                    placeholder={'Enter examination'}/>
                    <CustomTextArea value={formData.advice} id={'advice'} errorMessage={''} isError={false} title={'Enter Advice'}
                                    onChangeHandle={adviceChangeHandler} placeholder={'Enter advice'}/>
                    <CustomTextArea value={formData.notes} id={'notes'} errorMessage={''} isError={false} title={'Enter Notes'}
                                    onChangeHandle={notesChangeHandler} placeholder={'Enter notes'}/>
                    <div className={'add-prescription-button-container'}>
                        <Button type="primary" icon={<PlusCircleOutlined />} size={32} onClick={addDrugHandler}>
                            Add Drug
                        </Button>
                    </div>

                    <div>
                        { formData.drugs.map((drug, index) => {
                            return(
                                <div key={index}>
                                    <CustomInput value={drug.drugName} id={'drugName'} placeholder={'Enter drug name'}
                                                 type={'text'} isError={isFieldError.drugsError[index].isDrugNameError}
                                                 title={'Enter Drug Name'} errorMessage={'Enter valid drug name'}
                                                 onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'drugName')}/>
                                    <div className={'add-prescription-column'}>
                                        <CustomInput value={drug.strength} id={'strength'} placeholder={'Enter drug strength'}
                                                     type={'text'} isError={isFieldError.drugsError[index].isStrengthError}
                                                     title={'Enter Drug Strength'} errorMessage={'Enter valid drug strength'} isSmall={true}
                                                     onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'strength')}/>
                                        <CustomSelect value={drug.drugStrengthUnit} id={'drugStrengthUnit'} isSmall={true}
                                                      isError={isFieldError.drugsError[index].isDrugStrengthUnitError}
                                                      title={'Enter Drug Strength Unit'} options={drugStrengthUnitOptions}
                                                      errorMessage={'Enter valid drug strength unit'}
                                                      onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'drugStrengthUnit')}/>
                                    </div>
                                    <div className={'add-prescription-column'}>
                                        <CustomInput value={drug.dose} id={'dose'} placeholder={'Enter drug dose'} type={'text'}
                                                     isError={isFieldError.drugsError[index].isDoseError} title={'Enter Drug Dose'}
                                                     errorMessage={'Enter valid drug dose'} isSmall={true}
                                                     onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'dose')}/>
                                        <CustomSelect value={drug.doseUnit} id={'doseUnit'} options={doseUnitOptions}
                                                      isError={isFieldError.drugsError[index].isDoseUnitError} isSmall={true}
                                                      title={'Enter Drug Dose Unit'} errorMessage={'Enter valid drug dose unit'}
                                                      onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'doseUnit')}/>
                                    </div>
                                    <div className={'add-prescription-column'}>
                                        <CustomInput value={drug.duration} id={'duration'} placeholder={'Enter drug duration'} type={'text'}
                                                     isError={isFieldError.drugsError[index].isDurationError} title={'Enter Drug Duration'}
                                                     errorMessage={'Enter valid drug duration'} isSmall={true}
                                                     onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'duration')}/>
                                        <CustomSelect value={drug.durationUnit} id={'durationUnit'} options={durationUnitOptions}
                                                      isError={isFieldError.drugsError[index].isDurationUnitError} isSmall={true}
                                                      title={'Enter Drug Duration Unit'} errorMessage={'Enter valid drug duration unit'}
                                                      onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'durationUnit')}/>
                                    </div>
                                    <CustomSelect value={drug.preparation} id={'preparation'} options={preparationOptions}
                                                  isError={isFieldError.drugsError[index].isPreparationError}
                                                  title={'Enter Drug Preparation'} errorMessage={'Enter valid drug preparation'}
                                                  onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'preparation')}/>
                                    <CustomSelect value={drug.route} id={'route'} options={routeOptions}
                                                  isError={isFieldError.drugsError[index].isRouteError}
                                                  title={'Enter Drug Route'} errorMessage={'Enter valid drug route'}
                                                  onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'route')}/>
                                    <CustomSelect value={drug.direction} id={'direction'} options={directionOptions}
                                                  isError={isFieldError.drugsError[index].isDirectionError}
                                                  title={'Enter Drug Direction'} errorMessage={'Enter valid drug direction'}
                                                  onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'direction')}/>
                                    <CustomSelect value={drug.frequency} id={'frequency'} options={frequencyOptions}
                                                  isError={isFieldError.drugsError[index].isFrequencyError}
                                                  title={'Enter Drug Frequency'} errorMessage={'Enter valid drug frequency'}
                                                  onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'frequency')}/>
                                    <CustomInput value={drug.totalQuantity} id={'totalQuantity'} placeholder={'Enter total quantity'}
                                                 type={'number'} isError={isFieldError.drugsError[index].isTotalQuantityError}
                                                 title={'Enter Total Quantity'} errorMessage={'Enter valid total quantity'}
                                                 onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'totalQuantity')}/>
                                    <CustomTextArea value={drug.otherInstructions} errorMessage={''} isError={false} title={'Other Instructions'}
                                                    id={'otherInstructions'} placeholder={'Enter other instructions'}
                                                    onChangeHandle={(e) => drugValuesChangeHandler(e, index, 'otherInstructions')}/>
                                </div>
                            )
                        })}
                    </div>
                    <CustomButton title={'Add Prescription'} onClick={submitHandler} fontColor={'#f0f0f0'} bgColor={'#2c2d59'}/>
                </div>
            </div>
        )
    }
}

export default AddPrescriptionScreen;