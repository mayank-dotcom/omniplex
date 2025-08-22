import { initializeApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
export const firebaseConfig = {
  apiKey: "AIzaSyBqLgpt11CXEFkZCFzm0Is6u1gaeJiwD2Y",
  authDomain: "assignment-d7147.firebaseapp.com",
  projectId: "assignment-d7147",
  storageBucket: "assignment-d7147.firebasestorage.app",
  messagingSenderId: "892832177547",
  appId: "1:892832177547:web:03e8bd0338f31aca1f638e",
  measurementId: "G-F8SMQC6LFM"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize services
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
