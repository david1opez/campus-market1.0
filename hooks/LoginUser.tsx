import { initializeApp } from "firebase/app";
import Constants from 'expo-constants';
import {getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: Constants?.manifest?.extra?.FIREBASE_API_KEY,
    authDomain: Constants?.manifest?.extra?.FIREBASE_AUTH_DOMAIN,
    projectId: Constants?.manifest?.extra?.FIREBASE_PROJECT_ID,
    storageBucket: Constants?.manifest?.extra?.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: Constants?.manifest?.extra?.FIREBASE_MESSAGING_SENDERID,
    appId: Constants?.manifest?.extra?.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export default async function LoginUser(type: "email" | "google" | "apple", email?: string, password?: string) {
    if (type === "email" && email && password) {
        return signInWithEmailAndPassword(auth, email, password)
               .catch((error) => Promise.reject(error));
    }
}