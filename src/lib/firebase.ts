import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDRkDvEANAlnR6mIy5873IW9JjWoC4G7Kk",
  authDomain: "la-fabuleuse-tg-669c0.firebaseapp.com",
  databaseURL: "https://la-fabuleuse-tg-669c0-default-rtdb.firebaseio.com",
  projectId: "la-fabuleuse-tg-669c0",
  storageBucket: "la-fabuleuse-tg-669c0.firebasestorage.app",
  messagingSenderId: "190970983644",
  appId: "1:190970983644:web:1999ec77d9d7f09063b019",
  measurementId: "G-WZD3RN807G"
};

function getFirebaseApp(): FirebaseApp {
  if (getApps().length > 0) return getApp();
  return initializeApp(firebaseConfig);
}

const app = getFirebaseApp();

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const analytics = getAnalytics(app);

// Configuration par défaut pour LA FABULEUSE
export const DEFAULT_CONFIG = {
  adminEmail: "admin@lafabuleuse.tg",
  whatsappNumber: "259192719945977"
};


