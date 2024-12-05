import { defineStore } from 'pinia';
import { ref } from 'vue';
import { auth } from '../firebase/config';
import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const login = async (email: string, password: string) => {
    try {
      loading.value = true;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      loading.value = true;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      user.value = userCredential.user;
      error.value = null;
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      user.value = null;
    } catch (err: any) {
      error.value = err.message;
    }
  };

  return {
    user,
    loading,
    error,
    login,
    register,
    signOut
  };
});