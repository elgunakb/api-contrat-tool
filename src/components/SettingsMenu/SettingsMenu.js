import React from 'react';
import { Menu } from '@mantine/core';
import {
    faEllipsisVertical,
    faFolderOpen,
    faPenToSquare,
    faSignal,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { getFeaturesList, setNewFeaturesModalProps } from '../../redux/actions/features';
import styles from './SettingsMenu.module.scss';
import { firebaseMethod } from '../../services/firebase';
import { notification } from '../../services/notification';

const SettingsMenu = props => {
    const { feature } = props;
    const dispatch = useDispatch();

    const handleDelete = () => {
        firebaseMethod.deleteFeature(feature.id);
        dispatch(getFeaturesList());
    };

    const handleEdit = feature => {
        dispatch(
            setNewFeaturesModalProps({
                isVisible: true,
                setNewFeatureValue: feature.name,
                type: 'submit',
                featureId: feature.id,
            })
        );
    };

    const handleChangeStatusArchive = feature => {
        firebaseMethod.updateFeatureStatus(feature.id, 'archive');
        dispatch(getFeaturesList());
        notification.success(`${feature.name} is archived`);
    };

    const handleChangeStatusActive = feature => {
        firebaseMethod.updateFeatureStatus(feature.id, 'active');
        dispatch(getFeaturesList());
        notification.success(`${feature.name} is activated`);
    };

    return (
        <Menu shadow='md' width={128}>
            <Menu.Target>
                <span className={styles.settingsIcon} onClick={e => e.stopPropagation()} style={{ width: '8px' }}>
                    <FontAwesomeIcon icon={faEllipsisVertical} fontSize={'24px'} className={styles.button} />
                </span>
            </Menu.Target>
            <Menu.Dropdown onClick={e => e.stopPropagation()}>
                <Menu.Item
                    onClick={() => handleEdit(feature)}
                    icon={<FontAwesomeIcon className={styles.button} icon={faPenToSquare} />}
                >
                    Edit name
                </Menu.Item>
                {feature.status == 'archive' ? (
                    <Menu.Item
                        onClick={() => handleChangeStatusActive(feature)}
                        icon={<FontAwesomeIcon className={styles.button} icon={faSignal} />}
                    >
                        Active
                    </Menu.Item>
                ) : (
                    <Menu.Item
                        onClick={() => handleChangeStatusArchive(feature)}
                        icon={<FontAwesomeIcon className={styles.button} icon={faFolderOpen} />}
                    >
                        Archive
                    </Menu.Item>
                )}

                <Menu.Item
                    onClick={() => handleDelete(feature)}
                    icon={<FontAwesomeIcon className={styles.button} icon={faTrashCan} />}
                >
                    Delete
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
};

export default SettingsMenu;
