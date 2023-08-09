import React, { useEffect } from 'react';
import './Tab.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Tabs, Button, Badge, Loader } from '@mantine/core';
import SettingsMenu from '../SettingsMenu/SettingsMenu';
import { useNavigate } from 'react-router-dom';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getFeaturesList, setNewFeaturesModalProps } from '../../redux/actions/features';
import styles from './Tab.module.scss';
import ModalNew from '../Modal/Modal';

const Tab = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { featureList, isFetching } = useSelector(state => state.featureNewModal);

    useEffect(() => {
        dispatch(getFeaturesList());
    }, []);
    
    const openModal = () => {
        dispatch(setNewFeaturesModalProps({ isVisible: true }));
    };

    const featureId = feature => {
        navigate(`/features/${feature.id}`);
    };

    return (
        <>
            <>
                <Tabs defaultValue='active'>
                    <Tabs.List className={styles.tabList}>
                        <div className={styles.tabBtn}>
                            <Tabs.Tab
                                rightSection={
                                    <Badge w={18} h={18} variant='filled' size='xs' p={0}>
                                        {featureList.filter(a => a.status === 'active').length}
                                    </Badge>
                                }
                                value='active'
                            >
                                <p>Active</p>
                            </Tabs.Tab>
                            <Tabs.Tab
                                rightSection={
                                    <Badge w={18} h={18} variant='filled' size='xs' p={0} color='red'>
                                        {featureList.filter(a => a.status === 'archive').length}
                                    </Badge>
                                }
                                value='Archived'
                                color='red'
                            >
                                <p>Archive</p>
                            </Tabs.Tab>
                        </div>
                        <Button onClick={openModal}>+ NEW</Button>
                    </Tabs.List>

                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Tabs.Panel value='active' pt='xs'>
                            <ul>
                                {featureList.map(feature =>
                                    feature.status == 'active' ? (
                                        <li
                                            onClick={() => featureId(feature)}
                                            key={feature.id}
                                            className={styles.featureTitle}
                                        >
                                            {feature.name}
                                            <span>
                                                <FontAwesomeIcon
                                                    icon={faChevronDown}
                                                    rotation={270}
                                                    className={styles.button}
                                                />
                                                <SettingsMenu key={feature.id} feature={feature} />
                                            </span>
                                        </li>
                                    ) : null
                                )}
                            </ul>
                        </Tabs.Panel>
                    )}

                    <Tabs.Panel value='Archived' pt='xs'>
                        {featureList.map(feature =>
                            feature.status == 'archive' ? (
                                <li onClick={() => featureId(feature)} key={feature.id} className={styles.featureTitle}>
                                    {feature.name}
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            rotation={270}
                                            className={styles.button}
                                        />
                                        <SettingsMenu key={feature.id} feature={feature} />
                                    </span>
                                </li>
                            ) : null
                        )}
                    </Tabs.Panel>
                    <ModalNew />
                </Tabs>
            </>
        </>
    );
};

export default Tab;
