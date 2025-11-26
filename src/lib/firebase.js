// src/lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3biMOo-BPQ2vJmQIhPHo4mLsUZ6jHZ9w",
  authDomain: "verdora-app-b3974.firebaseapp.com",
  projectId: "verdora-app-b3974",
  storageBucket: "verdora-app-b3974.firebasestorage.app",
  messagingSenderId: "673425346754",
  appId: "1:673425346754:web:cafc06faa22a3ffb8f6b5b",
};

// Prevent Firebase from being initialized multiple times in Next.js
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Auth instance to use in login, register, logout
export const auth = getAuth(app);

export default app;
