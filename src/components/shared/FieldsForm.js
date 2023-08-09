import React from 'react';
import { Input, Select } from '@mantine/core';
import { BOOLEAN_TYPES, FIELD_TYPES } from '../../utils/Features/selectOptions';
import { Controller, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import SettingsMenu from '../Forms/SettingsMenu/SettingsMenu';
import styles from '../Forms/Form.module.scss';
import ReactCodeSinppet from 'react-code-snippet';
import { convertData } from '../../utils/setRequestFields';

const FieldsForm = ({
    fields,
    level,
    register,
    name,
    value,
    setValue,
    remove,
    control,
    getValues,
    isModifying,
    endpoint,
}) => {
    const { switchToggle, executedEndpoints } = useSelector(state => state.featureNewModal);

    const handleTypeChange = (index, value) => {
        setValue(`${name}.${index}.type`, value);
        setValue(`${name}.${index}.defaultValue`, '');

        if (value === 'object' || value === 'array') {
            if (name === 'responseFields') {
                setValue(`${name}.${index}.jsonFields`, [{ key: '', type: '' }]);
            } else {
                setValue(`${name}.${index}.jsonFields`, [{ key: '', defaultValue: '', type: '' }]);
            }
        } else {
            setValue(`${name}.${index}.jsonFields`, '');
        }
    };

    const typeValue = useWatch({
        control,
        name: `${name}`,
    });

    return (
        <>
            {switchToggle === 'json' && !isModifying ? (
                <ReactCodeSinppet lang='json' code={JSON.stringify(convertData(value, name), null, 2)} />
            ) : (
                fields.map((field, index) => {
                    return (
                        <section
                            key={field.id}
                            className={styles.treeFormContainer}
                            style={{ marginLeft: 20 * level + 'px' }}
                        >
                            <span className={styles.treeForm}>
                                <Input.Wrapper label='Field Name'>
                                    <Input
                                        disabled={!isModifying}
                                        {...register(`${name}.${index}.key`)}
                                        placeholder='Field Name'
                                    />
                                </Input.Wrapper>
                                {(isModifying || !executedEndpoints.includes(endpoint.id)) && (
                                    <Controller
                                        control={control}
                                        name={`${name}.${index}.type`}
                                        dropdownPosition='bottom'
                                        render={({ field }) => (
                                            <Select
                                                {...field}
                                                label='Type'
                                                placeholder='Type'
                                                clearable
                                                disabled={!isModifying}
                                                data={FIELD_TYPES.map(type => ({
                                                    value: type.value,
                                                    label: type.label,
                                                    group: type.group,
                                                }))}
                                                onChange={value => {
                                                    handleTypeChange(index, value);
                                                }}
                                            />
                                        )}
                                    />
                                )}
                                {name.includes('responseFields') ? null : (
                                    <Controller
                                        control={control}
                                        name={`${name}.${index}.defaultValue`}
                                        render={({ field }) => {
                                            const type = getValues(`${name}.${index}.type`);
                                            const defaultValue = value?.[index]?.defaultValue;
                                            if (typeValue) {
                                                if (typeValue[index].type) {
                                                    const foundItem = FIELD_TYPES.find(
                                                        item => item.value === typeValue[index].type
                                                    );

                                                    if (foundItem) {
                                                        if (foundItem.group === 'Number') {
                                                            return (
                                                                <Input.Wrapper
                                                                label={
                                                                    !isModifying && executedEndpoints.includes(endpoint.id)
                                                                        ? 'Value'
                                                                        : 'Default value'
                                                                }
                                                                >
                                                                    <Input
                                                                        disabled={
                                                                            !isModifying && !executedEndpoints.includes(endpoint.id)
                                                                        }
                                                                        type='number'
                                                                        {...field}
                                                                        onChange={field.onChange}
                                                                        placeholder='Default value'
                                                                    />
                                                                </Input.Wrapper>
                                                            );
                                                        }
                                                    }
                                                }
                                            }

                                            if (type === 'boolean') {
                                                return (
                                                    <Select
                                                        {...field}
                                                        disabled={
                                                            !isModifying && !executedEndpoints.includes(endpoint.id)
                                                        }
                                                        label='Boolean types'
                                                        placeholder='Boolean types'
                                                        clearable
                                                        data={BOOLEAN_TYPES.map(type => ({
                                                            value: type.value,
                                                            label: type.label,
                                                        }))}
                                                    />
                                                );
                                            }
                                            if (value?.[index]?.type === 'object' || value?.[index]?.type === 'array') {
                                                return null;
                                            } else {
                                                return (
                                                    <Input.Wrapper label='Default value'>
                                                        <Input
                                                             disabled={
                                                                !isModifying && !executedEndpoints.includes(endpoint.id)
                                                            }
                                                            value={defaultValue}
                                                            onChange={field.onChange}
                                                            placeholder='Default value'
                                                        />
                                                    </Input.Wrapper>
                                                );
                                            }
                                        }}
                                    />
                                )}

                                {isModifying ? (
                                    <SettingsMenu
                                        setValue={setValue}
                                        index={index}
                                        value={value}
                                        name={name}
                                        remove={remove}
                                    />
                                ) : null}
                            </span>

                            {value[index]?.jsonFields?.length > 0 && (
                                <>
                                    <FieldsForm
                                        control={control}
                                        register={register}
                                        fields={value[index].jsonFields}
                                        remove={remove}
                                        value={value[index].jsonFields}
                                        setValue={setValue}
                                        getValues={getValues}
                                        name={`${name}.${index}.jsonFields`}
                                        level={level + 1}
                                        isModifying={isModifying}
                                        endpoint={endpoint}
                                    />
                                </>
                            )}
                        </section>
                    );
                })
            )}
        </>
    );
};

export default FieldsForm;
