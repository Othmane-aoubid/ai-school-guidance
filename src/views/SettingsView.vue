<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden" style="overflow-y: scroll">
      <TopNavigation :profilePicture="dataStore.profilePic" />
      <div class="space-y-6 px-3">
        <h1 class="text-2xl font-semibold text-gray-900">Settings</h1>

        <div class="bg-white rounded-lg shadow-sm">
          <div class="p-6 space-y-6">
            <!-- Profile Picture -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Profile Picture</h3>
              <div class="flex items-center gap-4">
                <div class="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  <img
                    v-if="dataStore.profilePic"
                    :src="dataStore.profilePic"
                    alt="Profile Picture"
                    class="w-full h-full object-cover"
                  />
                  <UserCircleIcon v-else class="w-full h-full text-gray-500" />
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    @change="handleImageUpload"
                    class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    @click="saveProfilePicture"
                    class="mt-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Save Picture
                  </button>
                </div>
              </div>
            </div>

            <!-- Preferences Section -->
            <div class="space-y-6">
              <h3 class="text-lg font-medium text-gray-900">Preferences</h3>

              <!-- Notifications -->
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700">Notifications</label>
                  <p class="text-sm text-gray-500">Receive notifications about updates</p>
                </div>
                <button
                  @click="currentSettings.notifications = !currentSettings.notifications"
                  :class="[currentSettings.notifications ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors']"
                >
                  <span
                    :class="[currentSettings.notifications ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform bg-white rounded-full']"
                  ></span>
                </button>
              </div>

              <!-- Email Updates -->
              <div class="flex items-center justify-between">
                <div>
                  <label class="text-sm font-medium text-gray-700">Email Updates</label>
                  <p class="text-sm text-gray-500">Receive email notifications</p>
                </div>
                <button
                  @click="currentSettings.emailUpdates = !currentSettings.emailUpdates"
                  :class="[currentSettings.emailUpdates ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors']"
                >
                  <span
                    :class="[currentSettings.emailUpdates ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 transform bg-white rounded-full']"
                  ></span>
                </button>
              </div>

              <!-- Language Selection -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Language</label>
                <select
                  v-model="currentSettings.language"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                >
                  <option v-for="lang in languages" :key="lang.value" :value="lang.value">
                    {{ lang.label }}
                  </option>
                </select>
              </div>
            </div>

            <!-- Save Button -->
            <div class="pt-5">
              <button
                @click="saveSettings"
                class="w-full bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../stores/auth";
import { useDataStore } from "../stores/data"; // Import the data store
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Sidebar from "../components/Sidebar.vue";
import TopNavigation from "../components/TopNavigation.vue";
import { UserCircleIcon } from "@heroicons/vue/24/solid";

// Initialize stores
const authStore = useAuthStore();
const dataStore = useDataStore(); // Initialize data store

const currentSettings = ref({
  notifications: true,
  emailUpdates: false,
  language: "en",
});

const selectedFile = ref(null);

const languages = [
  { value: "en", label: "English" },
  { value: "es", label: "Spanish" },
  { value: "fr", label: "French" },
];

// Handle image upload and preview
const handleImageUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    selectedFile.value = file;
    const reader = new FileReader();
    reader.onload = () => {
      dataStore.setProfilePic(reader.result); // Store the preview image in data store
    };
    reader.readAsDataURL(file);
  }
};

// Save the profile picture to Firebase and data store
const saveProfilePicture = async () => {
  if (!selectedFile.value || !authStore.user) {
    alert("Please upload an image and ensure you're logged in.");
    return;
  }

  try {
    const userDocRef = doc(db, "users", authStore.user.uid);
    await setDoc(userDocRef, { profilePicture: dataStore.profilePic }, { merge: true });
    alert("Profile picture saved successfully!");
    await fetchProfilePicture(); // Refresh the profile picture
  } catch (error) {
    console.error("Error saving profile picture:", error);
    alert("Failed to save profile picture.");
  }
};

// Fetch the profile picture from Firebase and store it in data store
const fetchProfilePicture = async () => {
  if (authStore.user) {
    try {
      const userDocRef = doc(db, "users", authStore.user.uid);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        dataStore.setProfilePic(userSnapshot.data().profilePicture || null);
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }
};

onMounted(() => {
  fetchProfilePicture(); // Fetch the profile picture on component mount
});

const saveSettings = () => {
  console.log("Settings saved:", currentSettings.value);
};
</script>