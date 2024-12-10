import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtwvxsu5WX9FXhuGoNgVm-X7b3GgWKy6I",
  authDomain: "ai-school-guidance.firebaseapp.com",
  projectId: "ai-school-guidance",
  storageBucket: "ai-school-guidance.firebasestorage.app",
  messagingSenderId: "714677739951",
  appId: "1:714677739951:web:22aea3246afcf6e1cc4f5a",
  measurementId: "G-PG5DG7599S"
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