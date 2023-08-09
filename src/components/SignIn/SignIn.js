import React, { useEffect, useState } from 'react';
import { auth, provider } from '../../Config/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Menu } from '@mantine/core';
import styles from './SignIn.module.scss';
import { notification } from '../../services/notification';
import { useAuth } from './AuthContext';

const SignIn = () => {
    const [value, setValue] = useState('');
    const [user, setUser] = useState('');
    const { currentUser } = useAuth();

    const handleClick = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                setValue(localStorage.setItem('token', token));
                const user = result.user;
                setUser(user);
                notification.success(`You are sign in. ${user.displayName}`);
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.error(errorMessage);
                console.log(errorMessage);
            });
    };

    useEffect(() => {
        setValue(localStorage.getItem('token'));
    }, []);

    const handleLogOut = () => {
        auth.signOut()
            .then(() => {
                notification.success('Log out');
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <>
            {currentUser ? (
                <div className={styles.profile}>
                    <Menu shadow='md' width={260}>
                        <Menu.Target>
                            <Avatar src={currentUser.photoURL} alt="userPhoto" />
                        </Menu.Target>

                        <Menu.Dropdown>
                            <div className={styles.detailsAvatar}>
                                <Avatar variant='outline' radius='50%' size='xl' src={currentUser.photoURL} />
                            </div>
                            <div className={styles.userDetails}>
                                <p>{currentUser.displayName}</p>
                                <p className={styles.userEmails}>
                                    {currentUser.email.slice(0, 20)}
                                    <br />
                                    {currentUser.email.slice(20)}
                                </p>
                                <span></span>
                            </div>

                            <Menu.Item icon={<FontAwesomeIcon icon={faRightFromBracket} />} onClick={handleLogOut}>
                                Sign out
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </div>
            ) : (
                <FontAwesomeIcon onClick={handleClick} title='Sign in with google' icon={faRightToBracket} />
            )}
        </>
    );
};

export default SignIn;
