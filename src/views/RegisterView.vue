<template>
  <div
    class="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-800 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div
      class="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl"
    >
      <div>
        <RouterLink to="/" class="flex justify-center mb-6">
          <div
            class="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center"
          >
            <font-awesome-icon
              icon="graduation-cap"
              class="text-white text-2xl"
            />
          </div>
        </RouterLink>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-white">
          Create your account
        </h2>
        <p class="mt-2 text-center text-sm text-gray-300">
          Or
          <RouterLink
            to="/login"
            class="font-medium text-purple-300 hover:text-purple-200"
          >
            sign in to your existing account
          </RouterLink>
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="register">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="name" class="sr-only">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              autocomplete="name"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Full name"
              v-model="name"
            />
          </div>
          <div>
            <label for="email-address" class="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              v-model="email"
            />
          </div>
          <div>
            <label for="password" class="sr-only">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="new-password"
              required
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              v-model="password"
            />
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              class="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label for="agree-terms" class="ml-2 block text-sm text-gray-300">
              I agree to the
              <a href="#" class="text-purple-300 hover:text-purple-200"
                >Terms and Conditions</a
              >
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <font-awesome-icon
                icon="user-plus"
                class="h-5 w-5 text-purple-500 group-hover:text-purple-400"
                aria-hidden="true"
              />
            </span>
            Create Account
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faGraduationCap, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config"; 

library.add(faGraduationCap, faUserPlus);

const router = useRouter();
const name = ref("");
const email = ref("");
const password = ref("");

const register = async () => {
  try {
    // Ensure all fields are filled
    if (!name.value || !email.value || !password.value) {
      alert("Please fill in all fields.");
      return;
    }

    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    const user = userCredential.user;

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name: name.value,
      email: user.email,
      createdAt: serverTimestamp(),
    });

    console.log("User registered and added to Firestore:", user.uid);

    // Redirect to login page
    router.push("/login");
  } catch (error) {
    console.error("Error during registration:", error.message);

    // Display appropriate error messages
    if (error.code === "auth/email-already-in-use") {
      alert("The email is already in use.");
    } else if (error.code === "auth/weak-password") {
      alert("Password should be at least 6 characters.");
    } else {
      alert("Registration failed: " + error.message);
    }
  }
};
</script>

