// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDRBCJUr_CHV0b2I1kKfmk_9_tqtLb_kUU",
    authDomain: "reels-bc70a.firebaseapp.com",
    projectId: "reels-bc70a",
    storageBucket: "reels-bc70a.appspot.com",
    messagingSenderId: "232546196129",
    appId: "1:232546196129:web:1a4dbf9dbdc253d79eeee0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const Auth = firebase.auth();

const firestore = firebase.firestore();

// why export one database
export const database = {
    users: firestore.collection("users"),
    posts : firestore.collection("posts"),
    getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
};

export const storage = firebase.storage();