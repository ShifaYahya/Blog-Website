// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//authentication
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCIMQwWNNm7Qr7uQkuE3qToxgf-Gvash8",
  authDomain: "blog-website-b61e3.firebaseapp.com",
  projectId: "blog-website-b61e3",
  storageBucket: "blog-website-b61e3.appspot.com",
  messagingSenderId: "427190146191",
  appId: "1:427190146191:web:3b3c032cf8223bd7a58cfa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//databse


//auhentication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();  //export both of them as we will be acessing them outside this file

export const db =getFirestore(app);