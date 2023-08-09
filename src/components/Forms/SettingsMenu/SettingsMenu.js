import { faEllipsisVertical, faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu } from '@mantine/core';
import React from 'react';
import styles from './Menu.module.scss';

const SettingsMenu = ({ value, setValue, index, name }) => {
    return (
        <Menu className={styles.menuStyle} style={{ marginTop: '26px' }}>
            <Menu.Target>
                <FontAwesomeIcon className={styles.menuIcon} icon={faEllipsisVertical} fontSize={'24px'} />
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item
                    icon={<FontAwesomeIcon icon={faPlus} />}
                    onClick={() => {
                        const nextIndex = index + 1;
                        const newFields = [
                            ...value.slice(0, nextIndex),
                            { key: '', defaultValue: '', type: '' },
                            ...value.slice(nextIndex),
                        ];
                        setValue(`${name}`, newFields);
                    }}
                >
                    Append
                </Menu.Item>
                {value.length > 1 ? (
                    <Menu.Item
                        icon={<FontAwesomeIcon icon={faTrashCan} />}
                        onClick={() => {
                            const newFields = value.filter((_, i) => i !== index);
                            setValue(name, newFields);
                        }}
                    >
                        Delete
                    </Menu.Item>
                ) : null}
            </Menu.Dropdown>
        </Menu>
    );
};

export default SettingsMenu;
