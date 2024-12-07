
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQHWcQg5Alw1IZkD3voTdgmzWwYi9uHlw",
  authDomain: "game-app-d7420.firebaseapp.com",
  projectId: "game-app-d7420",
  storageBucket: "game-app-d7420.firebasestorage.app",
  messagingSenderId: "613289680293",
  appId: "1:613289680293:web:ff983296ac836005b05c4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;