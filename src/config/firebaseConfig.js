// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbWFseVt-d5eBjRMhvolLKha1jKO20rJM",
  authDomain: "renew-wisconsin-402101.firebaseapp.com",
  projectId: "renew-wisconsin-402101",
  storageBucket: "renew-wisconsin-402101.appspot.com",
  messagingSenderId: "492981142944",
  appId: "1:492981142944:web:0e7448fe502d2bad2310c5",
  measurementId: "G-6BJH4YRDXM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };