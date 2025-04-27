import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import {
    getFirestore, collection, addDoc,
    serverTimestamp, deleteDoc,
    updateDoc, getDocs, getDoc, doc, setDoc,
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD73twY9s1cVwAwbNT-C3Lt9N8y5u6KWT4",
    authDomain: "pro1-341d6.firebaseapp.com",
    projectId: "pro1-341d6",
    storageBucket: "pro1-341d6.appspot.com",
    messagingSenderId: "644727580116",
    appId: "1:644727580116:web:8d80f885a4e50f2c7aa241"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    db,
    auth,
    createUserWithEmailAndPassword,
    signOut,
    collection,
    addDoc,
    getDocs,
    getDoc,
    sendPasswordResetEmail,
    doc,
    serverTimestamp,
    updateDoc,
    setDoc,
    onAuthStateChanged,
    deleteDoc,
    getAuth,
};


