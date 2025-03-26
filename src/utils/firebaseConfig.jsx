import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth"; // ✅ Ajout de FacebookAuthProvider
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChKdEoRy5ggi0OYCxvyakNY5As35NUKLc",
  authDomain: "banguinonce.firebaseapp.com",
  projectId: "banguinonce",
  storageBucket: "banguinonce.appspot.com", // ⚠️ Correction ici ("firebasestorage.app" ➝ "appspot.com")
  messagingSenderId: "329882202067",
  appId: "1:329882202067:web:4f6c2447495e8272394926",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Fournisseurs d'authentification
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider(); // ✅ Ajout de Facebook Auth
