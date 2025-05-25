// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// ✅ Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Y-u6I57wEJq3haxjfq76IUjf_KAnj5w",
  authDomain: "chat-app-b8265.firebaseapp.com",
  projectId: "chat-app-b8265",
  storageBucket: "chat-app-b8265.appspot.com", // ✅ corrected `.app` to `.appspot.com`
  messagingSenderId: "663898145716",
  appId: "1:663898145716:web:eab2f04fa91712dd2568e1",
  measurementId: "G-3PH5H6EQLH"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // ✅ Add this line to initialize Auth
const analytics = getAnalytics(app);

// ✅ Export auth so other files can use it
export { auth };
