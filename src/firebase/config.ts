import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl5Tsfr-Sk_4HQcY1IytDskW-OeisKGws",
  authDomain: "task-buddy-69347.firebaseapp.com",
  projectId: "task-buddy-69347",
  storageBucket: "task-buddy-69347.firebasestorage.app",
  messagingSenderId: "1056188236491",
  appId: "1:1056188236491:web:b2cc7f650840d67afa914e",
  measurementId: "G-RVE60FJ93F",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
