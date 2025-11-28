// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
// It's recommended to use environment variables for this in production
const firebaseConfig = {
  apiKey: "AIzaSyBWyPltlxAWzgflmE9JSex2DWjHw5_XtOY",
  authDomain: "rentacar-system.firebaseapp.com",
  projectId: "rentacar-system",
  storageBucket: "rentacar-system.firebasestorage.app",
  messagingSenderId: "780696542660",
  appId: "1:780696542660:web:1fa5f0fef891f8c9869891",
  measurementId: "G-K63D0ET5LE"
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // Initialize Auth

export { db, storage, auth }; // Export auth
