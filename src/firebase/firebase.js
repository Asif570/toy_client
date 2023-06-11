// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA3WU__nRhG7uFdTn8o6sSfB1BbjCEkGA",
  authDomain: "toyzone-1ff97.firebaseapp.com",
  projectId: "toyzone-1ff97",
  storageBucket: "toyzone-1ff97.appspot.com",
  messagingSenderId: "726689943332",
  appId: "1:726689943332:web:841c87a4759bb9148aedb1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
