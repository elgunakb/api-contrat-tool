import React from 'react';
import FieldsSection from '../FieldsSection/FieldsSection';
import { useSelector } from 'react-redux';

const FieldsSections = ({ register, setValue, control, getValues, value, endpoint, isModifying }) => {
    const { executedEndpoints } = useSelector(state => state.featureNewModal);

    return (
        <>
            <FieldsSection
                label='Request params'
                register={register}
                name='requestParams'
                setValue={setValue}
                control={control}
                getValues={getValues}
                level={0}
                value={value}
                isModifying={isModifying}
                endpoint={endpoint}
            />
            {value?.requestPayload ? (
                <FieldsSection
                    isModifying={isModifying}
                    label='Request payload'
                    register={register}
                    name='requestPayload'
                    setValue={setValue}
                    control={control}
                    getValues={getValues}
                    level={0}
                    value={value}
                    endpoint={endpoint}
                />
            ) : null}

            {isModifying || !executedEndpoints.includes(endpoint.id) ? (
                <FieldsSection
                    isModifying={isModifying}
                    label='Response'
                    register={register}
                    name='responseFields'
                    setValue={setValue}
                    control={control}
                    getValues={getValues}
                    level={0}
                    value={value}
                    endpoint={endpoint}
                />
            ) : null}
        </>
    );
};

export default FieldsSections;
