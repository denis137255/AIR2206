import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'; // Import Auth related functions

const firebaseConfig = {
    apiKey: "AIzaSyDe7LT6k3TZVENTEv3xkX08J0vfvNd5y_U",
    authDomain: "reservate-692c7.firebaseapp.com",
    projectId: "reservate-692c7",
    storageBucket: "reservate-692c7.appspot.com",
    messagingSenderId: "182175651099",
    appId: "1:182175651099:web:233a844329302d67c36fbe",
    measurementId: "G-VEQDZXE4CV"
  };
  
  export const FIREBASE_APP = initializeApp(firebaseConfig);
  export const FIREBASE_AUTH = getAuth(FIREBASE_APP); // Get the Auth instance
  