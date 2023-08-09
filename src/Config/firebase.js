import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyB8gd71i6sJ_UsbHYcxWYvj5fT9HAUCjNs',
    authDomain: 'apicontracttool.firebaseapp.com',
    projectId: 'apicontracttool',
    storageBucket: 'apicontracttool.appspot.com',
    messagingSenderId: '821683111220',
    appId: '1:821683111220:web:0162dd4105ce26c2fa9161',
    measurementId: 'G-ZF8ZCK14H9',
    databaseURL: 'https://apicontracttool-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
