import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd5_EW4hGSqfJdwWnywHpIBU7VGyJ_yAk",
  authDomain: "book-e-commerce-dfef2.firebaseapp.com",
  projectId: "book-e-commerce-dfef2",
  storageBucket: "book-e-commerce-dfef2.appspot.com",
  messagingSenderId: "782087524330",
  appId: "1:782087524330:web:5ec022b2bc263d4cf02c93",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

