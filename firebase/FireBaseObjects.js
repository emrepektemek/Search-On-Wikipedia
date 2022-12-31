import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD4EGCl3nyyXxrLhEo1M-bcj4QlACZX3uU",
    authDomain: "financial-project-468a9.firebaseapp.com",
    databaseURL: "https://financial-project-468a9-default-rtdb.firebaseio.com",
    projectId: "financial-project-468a9",
    storageBucket: "financial-project-468a9.appspot.com",
    messagingSenderId: "529826267484",
    appId: "1:529826267484:web:2ffea161a67d6cd3364199",
    measurementId: "G-C08CV4J0XH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export function getAuthObject(){
    return auth;
}

export function getDbObject(){
    return db;
}