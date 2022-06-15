// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCR5E5mFpu9zSZ09ZkMGwwZKXEG7AwOD34",
  authDomain: "ieltsprac-8c0b4.firebaseapp.com",
  projectId: "ieltsprac-8c0b4",
  storageBucket: "ieltsprac-8c0b4.appspot.com",
  messagingSenderId: "514070074658",
  appId: "1:514070074658:web:47c98d9d12ad32eb6d017b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
export const currentQuestionID = "tSwabg8J9R00EDTxUd83";