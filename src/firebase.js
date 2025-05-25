// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // <-- Import Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA8Y-u6I57wEJq3haxjfq76IUjf_KAnj5w",
  authDomain: "chat-app-b8265.firebaseapp.com",
  projectId: "chat-app-b8265",
  storageBucket: "chat-app-b8265.appspot.com",  // Corrected
  messagingSenderId: "663898145716",
  appId: "1:663898145716:web:eab2f04fa91712dd2568e1",
  measurementId: "G-3PH5H6EQLH"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);   // <-- Initialize Firestore
const analytics = getAnalytics(app);

export { auth, db };  // <-- Export both auth and db
