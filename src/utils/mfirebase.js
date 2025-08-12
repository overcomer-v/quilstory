// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsrfqJzrYCybjyIbVQ20lWU_Plsxz8dns",
  authDomain: "quilstory-5bd2e.firebaseapp.com",
  projectId: "quilstory-5bd2e",
  storageBucket: "quilstory-5bd2e.firebasestorage.app",
  messagingSenderId: "228058973123",
  appId: "1:228058973123:web:92973ab1e0a1275e853376",
  measurementId: "G-NDVSJ48CKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const gProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export {auth,storage,db,gProvider}