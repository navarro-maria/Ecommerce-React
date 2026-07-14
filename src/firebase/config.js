// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// nos permite conectarnos a la base de datos de firebase
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXVTK1ZUwLLDAcMsDfyROj5LoLuB8-Ruc",
    authDomain: "mi-ecommerce-react-890cb.firebaseapp.com",
    projectId: "mi-ecommerce-react-890cb",
    storageBucket: "mi-ecommerce-react-890cb.firebasestorage.app",
    messagingSenderId: "1095776230738",
    appId: "1:1095776230738:web:c74ddb5e3c8040ae83ae8b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);