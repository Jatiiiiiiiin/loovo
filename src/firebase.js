import { initializeApp } from 'firebase/app'; // Firebase initialization
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'; // Correct imports for Firebase v9+
import { getFirestore } from 'firebase/firestore'; // Firestore imports (if needed)
import { updateProfile } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCa8_WlzyQ51ifZeTu7IPp4rOsn56kWQq8",
  authDomain: "loovo-app.firebaseapp.com",
  projectId: "loovo-app",
  storageBucket: "loovo-app.firebasestorage.app",
  messagingSenderId: "178216618507",
  appId: "1:178216618507:web:f89cc44003a343f26cd50e",
  measurementId: "G-KW7XLFC4TV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export the necessary functions and instances
export { app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, db };
