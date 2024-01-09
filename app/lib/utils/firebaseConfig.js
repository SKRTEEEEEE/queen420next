// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE,
  authDomain: 'queen420-nft.firebaseapp.com',
  projectId: 'queen420-nft',
  storageBucket: 'queen420-nft.appspot.com',
  messagingSenderId: '359504045894',
  appId: '1:359504045894:web:870b7a8aa367853528e747',
  measurementId: 'G-ZM2YL7PRL1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
