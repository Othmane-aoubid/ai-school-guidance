import { defineStore } from "pinia";
import { ref, watchEffect } from "vue";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  // Set Firebase authentication persistence to local
  setPersistence(auth, browserLocalPersistence)
    .then(() => {})
    .catch((err) => {
      console.error("Error setting persistence:", err);
    });

  // Listen for authentication state changes (even after refresh)
  const listenToAuthStateChange = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        user.value = firebaseUser;
      } else {
        user.value = null;
      }
    });
  };

  // Automatically call the auth state listener when the store is created
  listenToAuthStateChange();

  const initializeAuth = () => {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          user.value = firebaseUser;
        } else {
          user.value = null;
        }
        unsubscribe();
        resolve();
      });
    });
  };

  const login = async (email, password) => {
    try {
      loading.value = true;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email, password) => {
    try {
      loading.value = true;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user.value = userCredential.user;
      error.value = null;
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      user.value = null;
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    signOut,
    initializeAuth,
  };
});
