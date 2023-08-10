import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1-GmZiwvzZLfCwAj31qZ0p9J0PoXwvzc",
  authDomain: "gym-and-fitness-4d6c0.firebaseapp.com",
  projectId: "gym-and-fitness-4d6c0",
  storageBucket: "gym-and-fitness-4d6c0.appspot.com",
  messagingSenderId: "607676683089",
  appId: "1:607676683089:web:0b0fe91bd51ae5bb9ff970",
  measurementId: "G-1DW55175JB",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
