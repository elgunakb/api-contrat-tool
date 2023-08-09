import React, { useEffect } from 'react';
import { Modal, Button, Input } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { clearFeatureProps, getFeaturesList, setNewFeaturesModalProps } from '../../redux/actions/features';
import styles from './Modal.module.scss';
import { setNewFeatureValues } from '../../utils/Features/setNewFeatureValues';
import { firebaseMethod } from '../../services/firebase';

const ModalNew = () => {
    const dispatch = useDispatch();
    const { isVisible, type, setNewFeatureValue, featureId } = useSelector(
        state => state.featureNewModal.newFeatureModalProps
    );

    const onClose = () => {
        dispatch(clearFeatureProps());
    };

    const handleFeatureValueChange = e => {
        dispatch(setNewFeaturesModalProps({ setNewFeatureValue: e.target.value }));
    };

    const writeDatabase = () => {
        setNewFeatureValues({ dispatch, setNewFeatureValue });
    };

    const handleSubmitChange = () => {
        firebaseMethod.updateFeatureName(featureId, setNewFeatureValue);
        dispatch(clearFeatureProps());
        dispatch(getFeaturesList());
    };
   
    return (
        <Modal
            className={styles.modalContainer}
            opened={isVisible}
            onClose={onClose}
            title={type === 'submit' ? 'Edit Future' : 'New Future'}
            centered
        >
            <label>Name :</label>
            <Input
                className={styles.input}
                placeholder='Feature name'
                value={setNewFeatureValue}
                onChange={handleFeatureValueChange}
            />
            {type === 'submit' ? (
                <Button className={styles.button} onClick={handleSubmitChange}>
                    Submit
                </Button>
            ) : (
                <Button className={styles.button} onClick={writeDatabase}>
                    Create
                </Button>
            )}
        </Modal>
    );
};

export default ModalNew;
