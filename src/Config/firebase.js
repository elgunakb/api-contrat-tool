import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyC1qVHQqwNs_jJZ91NXxZFb9SmV-vcgJFI',
    authDomain: 'api-test-8ef53.firebaseapp.com',
    projectId: 'api-test-8ef53',
    storageBucket: 'api-test-8ef53.appspot.com',
    messagingSenderId: '237013657374',
    appId: '1:237013657374:web:d9f92a3b23b38e63c9cb0f',
    measurementId: 'G-38FLM72CGQ',
    databaseURL: 'https://api-test-8ef53-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
