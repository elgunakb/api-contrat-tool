import React, { useEffect } from 'react';
import { SegmentedControl } from '@mantine/core';
import TreeIcon from '../../assets/img/treeIcon.svg';
import JsonIcon from '../../assets/img/jsonIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { setSwitchToggle } from '../../redux/actions/features';

const ToggleSwitch = () => {
    const { switchToggle } = useSelector(state => state.featureNewModal);
    const dispatch = useDispatch();

    useEffect(() => {
        const savedSwitchToggle = localStorage.getItem('switchToggle');
        if (savedSwitchToggle) {
            dispatch(setSwitchToggle(savedSwitchToggle));
        }
    }, [dispatch]);

    const handleChange = value => {
        dispatch(setSwitchToggle(value));
        localStorage.setItem('switchToggle', value);
    };
    
    return (
        <SegmentedControl
            data={[
                {
                    value: 'tree',
                    label: <img style={{ width: '80%' }} title='Json view tree' src={TreeIcon} alt='Tree Icon' />,
                },
                {
                    value: 'json',
                    label: <img style={{ width: '80%' }} title='Json view json' src={JsonIcon} alt='Json Icon' />,
                },
            ]}
            value={switchToggle}
            onChange={handleChange}
        />
    );
};

export default ToggleSwitch;
