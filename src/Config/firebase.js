import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD3OhiCGWuTPA4hdbXxCYx2CxvTewdNL1w",
    authDomain: "api-contrat-tool.firebaseapp.com",
    projectId: "api-contrat-tool",
    storageBucket: "api-contrat-tool.appspot.com",
    messagingSenderId: "247461170416",
    appId: "1:247461170416:web:d64aae47e09c7d09a08635",
   databaseURL: "https://api-contrat-tool-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };

// 

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD3OhiCGWuTPA4hdbXxCYx2CxvTewdNL1w",
//   authDomain: "api-contrat-tool.firebaseapp.com",
//   projectId: "api-contrat-tool",
//   storageBucket: "api-contrat-tool.appspot.com",
//   messagingSenderId: "247461170416",
//   appId: "1:247461170416:web:d64aae47e09c7d09a08635",
//    databaseURL:  https://api-contrat-tool-default-rtdb.europe-west1.firebasedatabase.app/
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);