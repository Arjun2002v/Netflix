import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDfDd73rUN7y-f02yrqrXkBq05NotQ32xs",
  authDomain: "netflix-be2cc.firebaseapp.com",
  projectId: "netflix-be2cc",
  storageBucket: "netflix-be2cc.firebasestorage.app",
  messagingSenderId: "683175116782",
  appId: "1:683175116782:web:2a6d5782603daa3e3298ff",
  measurementId: "G-3171JSS0R6",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
