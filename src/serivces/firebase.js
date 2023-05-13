// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBq42rbhuNSfE7ZR9xIiv2mOKl1hA6qH4I",
	authDomain: "booklib-709a1.firebaseapp.com",
	projectId: "booklib-709a1",
	storageBucket: "booklib-709a1.appspot.com",
	messagingSenderId: "866698331850",
	appId: "1:866698331850:web:435c68d7d63cf5d74ed633",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
