import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXgt_BNjcLVryLP7I3bjSoZEHmugQUWKA",
  authDomain: "in-app-notification-vue.firebaseapp.com",
  projectId: "in-app-notification-vue",
  storageBucket: "in-app-notification-vue.firebasestorage.app",
  messagingSenderId: "479534540543",
  appId: "1:479534540543:web:0ac228e5606d4a2c968eca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123';

export const initializeAdmin = async () => {
  try {
    // Try to sign in with admin credentials
    await signInWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
  } catch (error) {
    // If login fails, create admin account
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, ADMIN_PASSWORD);
      
      // Create admin profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: ADMIN_EMAIL,
        role: 'admin',
        name: 'Admin User',
        createdAt: new Date().toISOString()
      });
    } catch (createError) {
      console.error('Error creating admin:', createError);
    }
  }
};