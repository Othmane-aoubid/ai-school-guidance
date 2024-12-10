import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize app
export const auth = getAuth(app); // Named export for auth
export const db = getFirestore(app); // Named export for Firestore

// const ADMIN_EMAIL = 'admin@example.com';
// const ADMIN_PASSWORD = 'admin123';
// Initialize Firebase
// export const initializeAdmin = async () => {
//   try {
//     // Try to sign in with admin credentials
//     await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
//   } catch (error) {
//     // If login fails, create admin account
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      
//       // Create admin profile in Firestore
//       await setDoc(doc(db, 'users', userCredential.user.uid), {
//         email: ADMIN_EMAIL,
//         role: 'admin',
//         name: 'Admin User',
//         createdAt: new Date().toISOString()
//       });
//     } catch (createError) {
//       console.error('Error creating admin:', createError);
//     }
//   }
// };