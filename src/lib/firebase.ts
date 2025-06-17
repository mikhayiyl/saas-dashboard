// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAHM0vD7Yg8So-eR9ov95l2g7B2D2DTB-E",
  authDomain: "saas-dashboard-80add.firebaseapp.com",
  databaseURL: "https://saas-dashboard-80add-default-rtdb.firebaseio.com",
  projectId: "saas-dashboard-80add",
  storageBucket: "saas-dashboard-80add.firebasestorage.app",
  messagingSenderId: "56787658061",
  appId: "1:56787658061:web:8caf0b12ea19230836c304",
  measurementId: "G-8KPH0695K5",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
