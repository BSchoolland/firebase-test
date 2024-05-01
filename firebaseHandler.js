// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'dotenv/config'
// console.log(process.env);
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.firebase_apiKey,
  authDomain: process.env.firebase_authDomain,
  projectId: process.env.firebase_projectId,
  storageBucket: process.env.firebase_storageBucket,
  messagingSenderId: process.env.firebase_messagingSenderId,
  appId: process.env.firebase_appId,
};

console.log(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);