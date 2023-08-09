import { MantineProvider } from '@mantine/styles';
import Layout from './components/Layout/Layout';
import { Notifications } from '@mantine/notifications';
import styles from './styles/styles-global.module.css';

function App() {
    return (
        <>
            <MantineProvider>
                <Layout />
                <Notifications position='bottom-left' />
            </MantineProvider>
        </>
    );
}

export default App;
