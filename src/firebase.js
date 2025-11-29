// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD6egXWLUyUyTnjAj5tEYf6m5Im2fBJQiE",
  authDomain: "hackatest-81352.firebaseapp.com",
  projectId: "hackatest-81352",
  storageBucket: "hackatest-81352.firebasestorage.app",
  messagingSenderId: "748223467642",
  appId: "1:748223467642:web:42bc21aaf33af700c4abc3"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export { serverTimestamp };