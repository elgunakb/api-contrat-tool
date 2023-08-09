import React from 'react';
import Routes from '../../routes/Router';
import styles from '../../styles/styles-global.module.css';
import ToggleSwitch from '../Switch/Switch';
import FeatureLogo from '../../assets/img/featureLogo.svg';
import { useNavigate } from 'react-router-dom';
import SignIn from '../SignIn/SignIn';
import { AuthProvider } from '../SignIn/AuthContext';

const Layout = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/features/`);
    };

    return (
        <>
            <header>
                <div className={styles.container}>
                    <span className={styles.logo}>
                        <img src={FeatureLogo} onClick={handleClick} alt='logo' />
                    </span>
                    <span className={styles.headerEnd}>
                        <span className={styles.toggleSwitch}>
                            <ToggleSwitch />
                        </span>
                        <span className={styles.signIn}>
                            <AuthProvider>
                                <SignIn />
                            </AuthProvider>
                        </span>
                    </span>
                </div>
            </header>
            <main className={styles.container}>
                <Routes />
            </main>
        </>
    );
};

export default Layout;
