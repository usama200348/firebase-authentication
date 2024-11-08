import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBXDoX5_I2HtV5y5oAmmdjgVe7vWR9m6CY",
  authDomain: "ex-05-advance.firebaseapp.com",
  projectId: "ex-05-advance",
  storageBucket: "ex-05-advance.appspot.com",
  messagingSenderId: "190711846453",
  appId: "1:190711846453:web:a456f356e65d4589d7837c",
  measurementId: "G-02Y5PQ5SCT"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const  db= getFirestore(app)