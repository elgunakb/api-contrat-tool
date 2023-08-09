import React from 'react';
import styles from './FieldsSection.module.scss';
import FieldsForm from '../shared/FieldsForm';
import { useFieldArray } from 'react-hook-form';

const FieldsSection = ({ name, isModifying, control, label, value, ...props }) => {
    const fieldProps = useFieldArray({
        name,
        control,
    });

    return (
        <div className={styles.section}>
            <label>{label}</label>
            <FieldsForm
                isModifying={isModifying}
                control={control}
                fields={fieldProps.fields}
                name={name}
                value={value[name]}
                {...props}
            />
        </div>
    );
};

export default FieldsSection;
