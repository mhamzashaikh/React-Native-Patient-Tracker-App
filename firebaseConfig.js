// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh6nDHUBVeDU0DQhPEmlluIt7dCatT6og",
  authDomain: "patient-tracker-app-479d0.firebaseapp.com",
  databaseURL: "https://patient-tracker-app-479d0-default-rtdb.firebaseio.com",
  projectId: "patient-tracker-app-479d0",
  storageBucket: "patient-tracker-app-479d0.appspot.com",
  messagingSenderId: "929469016286",
  appId: "1:929469016286:web:4aa7cc0b4385c2232efa4f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { auth, database };
