import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5wKeAtpxCgvhy9vZls7Okg6M2P-je5YE",
    authDomain: "crm-aditya.firebaseapp.com",
    projectId: "crm-aditya",
    storageBucket: "crm-aditya.appspot.com",
    messagingSenderId: "184082942436",
    appId: "1:184082942436:web:242880b560240bfca25ff1"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
