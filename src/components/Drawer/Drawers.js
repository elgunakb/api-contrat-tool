import { Button, Drawer } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Form from '../Forms/form';
import { useForm, useWatch } from 'react-hook-form';
import { notification } from '../../services/notification';
import styles from './Drawer.module.scss';
import { firebaseMethod } from '../../services/firebase';
import { useParams } from 'react-router-dom';
import FieldsSections from '../FieldsSections/FieldsSections';
import { fieldsMethod } from '../../services/fields';

const Drawers = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { editFieldList, drawerProps } = useSelector(state => state.featureNewModal);
    const { isVisible, submitBtn } = drawerProps;

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        getValues,
        setValue,
    } = useForm({
        defaultValues: {
            requestParams: [{ key: '', type: '', defaultValue: '' }],
            requestPayload: null,
            responseFields: [{ key: '', type: '', defaultValue: '' }],
        },
    });

    const onSubmit = data => {
        if (editFieldList) {
            firebaseMethod.updateFeatureDetails(dispatch, id, editFieldList, data);
            firebaseMethod.resetFields(setValue, dispatch);
        } else {
            firebaseMethod.setNewFeatureDetails(data, id, dispatch);
            fieldsMethod.resetFields(setValue, dispatch);
        }
    };

    const onClose = () => {
        fieldsMethod.resetFields(setValue, dispatch);
    };

    useEffect(() => {
        if (editFieldList) {
            const { ...otherFields } = editFieldList;
            setValue('app', otherFields.app);
            setValue('description', otherFields.description);
            setValue('method', otherFields.method);
            setValue('requestParams', otherFields.requestParams);
            setValue('responseFields', otherFields.responseFields);
            setValue('url', otherFields.url);
            if (otherFields.requestPayload !== '') {
                setValue('requestPayload', otherFields.requestPayload);
            } else {
                setValue('requestPayload', '');
            }
        }
    }, [isVisible]);

    const methodValue = useWatch({
        control,
        name: 'method',
    });

    const value = useWatch({
        control,
    });

    useEffect(() => {
        if (editFieldList) {
            if (!editFieldList.requestPayload && editFieldList.method !== 'get') {
                setValue(`requestPayload`, [{ key: '', defaultValue: '', type: '' }]);
            } else {
                setValue(`requestPayload`, editFieldList.requestPayload);
            }
        } 
    }, [editFieldList]);

    return (
        <Drawer
            position='right'
            size={'xl'}
            opened={isVisible}
            onClose={onClose}
            title={editFieldList ? 'Edit' : 'New'}
            lockScroll={false}
            transitionProps={{ duration: 250 }}
            overlayProps={{ opacity: 0.6, blur: 0.5 }}
        >
            <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
                <Form register={register} control={control} errors={errors} setValue={setValue} />

                <div className={styles.treeForm}>
                    <FieldsSections
                        methodValue={methodValue}
                        control={control}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                        value={value}
                        isModifying={true}
                    />
                </div>

                <div className={styles.submitBtn}>
                    <Button type='submit' color={submitBtn ? 'green' : 'blue'}>
                        {submitBtn ? 'Submit' : 'Create'}
                    </Button>
                </div>

                {errors.jsonFields && notification.error('Please fill the blanks')}
            </form>
        </Drawer>
    );
};

export default Drawers;
