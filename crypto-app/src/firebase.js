// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBAAKG-HzaHCD8AF_Z_E6H_R_eWT7preRE",
  authDomain: "crypto-app-32c98.firebaseapp.com",
  projectId: "crypto-app-32c98",
  storageBucket: "crypto-app-32c98.firebasestorage.app",
  messagingSenderId: "313260551748",
  appId: "1:313260551748:web:f636cd4f694c9f9a6c1611",
  measurementId: "G-6RLZBMW1NV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();