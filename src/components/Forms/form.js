import { Input, Select } from '@mantine/core';
import React from 'react';
import { Controller } from 'react-hook-form';
import { APP_TYPES, FEATURE_METHODS } from '../../utils/Features/selectOptions';
import styles from './Form.module.scss';

const Form = props => {
    const { register, control, setValue } = props;

    return (
        <div className={styles.formContainer}>
            <span className={styles.form}>
                <Controller
                    rules={{ required: true }}
                    name='app'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label='App'
                            placeholder='App'
                            clearable
                            data={APP_TYPES.map(type => ({
                                value: type.value,
                                label: type.label,
                            }))}
                        />
                    )}
                />
                <Input.Wrapper label='Description'>
                    <Input
                        {...register('description', {
                            required: true,
                        })}
                        placeholder='Description'
                    />
                </Input.Wrapper>
                <Controller
                    rules={{ required: true }}
                    name='method'
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            label='Method'
                            clearable
                            placeholder='Method'
                            data={FEATURE_METHODS.map(type => ({
                                value: type.value,
                                label: type.label,
                            }))}
                            onChange={value => {
                                if (field.onChange) {
                                    field.onChange(value);
                                }

                                if (value === 'get' || value === null) {
                                    setValue(`requestPayload`, null);
                                } else {
                                    setValue(`requestPayload`, [{ key: '', defaultValue: '', type: '' }]);
                                }
                            }}
                        />
                    )}
                />
            </span>
            <span>
                <Input.Wrapper label='URL'>
                    <Input inputMode='url' {...register('url')} placeholder='URL' />
                </Input.Wrapper>
            </span>
        </div>
    );
};

export default Form;
