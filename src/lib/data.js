// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/messaging';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDg_9cATEPiWNK-0azQpDHXm0GOMkSRPQ0",
  authDomain: "forum-8c5ee.firebaseapp.com",
  projectId: "forum-8c5ee",
  storageBucket: "forum-8c5ee.appspot.com",
  messagingSenderId: "967302071960",
  appId: "1:967302071960:web:7d2a7a54631851df9df2ed"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);