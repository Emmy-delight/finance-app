// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "finance-app-d6e75.firebaseapp.com",
  projectId: "finance-app-d6e75",
  storageBucket: "finance-app-d6e75.firebasestorage.app",
  messagingSenderId: "2315958568",
  appId: "1:2315958568:web:8fe1b290e9e9c533edf81d"
};

// Initialize Firebase
const app = getApps().length == 0 ?  initializeApp(firebaseConfig) :getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage};
