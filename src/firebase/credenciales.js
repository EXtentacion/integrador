// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0BW-vYJFD-448Qj1WSCKYexmBl-56c_0",
  authDomain: "tickets-emaduar.firebaseapp.com",
  projectId: "tickets-emaduar",
  storageBucket: "tickets-emaduar.appspot.com",
  messagingSenderId: "178255788460",
  appId: "1:178255788460:web:9f842bc10a269ed6e46209"
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);




export default firebaseApp; 

