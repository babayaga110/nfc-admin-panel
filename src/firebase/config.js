import { initializeApp } from "firebase/app";
import { getAuth,connectAuthEmulator } from "firebase/auth";
import { getFirestore,connectFirestoreEmulator } from "firebase/firestore";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";
import { getStorage ,connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions"
export const App = initializeApp({
    apiKey:  `${import.meta.env.VITE_APP_API_KEY}`,
    authDomain: `${import.meta.env.VITE_APP_AUTH_DOMAIN}` ,
    projectId: `${import.meta.env.VITE_APP_PROJECT_ID}`,
    databaseURL: `${import.meta.env.VITE_APP_DATABASE_URL}`,
    storageBucket: `${import.meta.env.VITE_APP_STORAGE_BUCKET}` ,
    appId: `${import.meta.env.VITE_APP_APPID}`,
    messagingSenderId:  `${import.meta.env.VITE_APP_MESSAGING_SENDER_ID}`,
    measurementId: `${import.meta.env.VITE_APP_MEASUREMENT_ID}` ,
});
export const auth = getAuth(App);
export const db_firestore = getFirestore(App);
export const storage = getStorage(App);
export const db_database = getDatabase(App);
export const functions = getFunctions(App, "asia-south1");


// if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
//   connectAuthEmulator(auth, "http://localhost:9099");
//   connectFirestoreEmulator(db_firestore, "localhost", 8080); 
//   connectDatabaseEmulator(db_database, "localhost", 9000);
//   connectStorageEmulator(storage, "localhost", 9199);
//   connectFunctionsEmulator(functions, "localhost",5001);
// }