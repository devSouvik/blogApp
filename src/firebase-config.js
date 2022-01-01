import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCox9mkoC02lqHM0RN3CbAVZyInBGdKlC8",
  authDomain: "blogproject-2ba92.firebaseapp.com",
  projectId: "blogproject-2ba92",
  storageBucket: "blogproject-2ba92.appspot.com",
  messagingSenderId: "1002664811691",
  appId: "1:1002664811691:web:c003e8cadb7715d8002bee",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
