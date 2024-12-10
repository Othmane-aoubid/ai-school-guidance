<template>
  <div class="bg-white shadow-sm">
    <div class="px-4 h-16 flex items-center justify-between">
      <!-- Search -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <svg
            class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 16l-4-4m0 0l4-4m-4 4h16"
            />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      <!-- Right section -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="relative p-2 rounded-full hover:bg-gray-100"
          >
            <svg
              class="h-6 w-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405a2.032 2.032 0 00-.595-1.325L16 11.5V7a6 6 0 00-12 0v4.5l-1 1c-.19.19-.31.45-.31.74v1.76c0 .47.38.86.85.86H9"
              />
            </svg>
            <span
              class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"
            ></span>
          </button>
          <div
            v-if="isNotificationsOpen"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5"
          >
            <div class="px-4 py-2 text-sm font-medium text-gray-700 border-b">
              Notifications
            </div>
            <div
              v-for="notification in notifications"
              :key="notification.id"
              class="px-4 py-2 text-sm cursor-pointer"
            >
              <div class="font-medium text-gray-900">
                {{ notification.text }}
              </div>
              <div class="text-xs text-gray-500">{{ notification.time }}</div>
            </div>
          </div>
        </div>

        <!-- Profile -->
        <div class="relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center space-x-2"
          >
            <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <img
                v-if="profilePic"
                :src="profilePic"
                alt="Profile Picture"
                class="w-full h-full object-cover"
              />
              <svg
                v-else
                class="h-8 w-8 text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 12c2.5 0 4.5-2 4.5-4.5S14.5 3 12 3 7.5 5 7.5 7.5 9.5 12 12 12zM12 14c-2.7 0-6 1.3-6 4v2h12v-2c0-2.7-3.3-4-6-4z"
                />
              </svg>
            </div>
          </button>
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5"
          >
            <a href="#" class="block px-4 py-2 text-sm hover:bg-gray-100"
              >Profile Settings</a
            >
            <button
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import { useDataStore } from "../stores/data";
import { useAuthStore } from "../stores/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "vue-router";
import { db } from "../firebase/config";

export default {
  data() {
    return {
      searchQuery: "",
      notifications: [
        { id: 1, text: "New user registered", time: "5m ago" },
        { id: 2, text: "Server update completed", time: "1h ago" }
      ],
      isNotificationsOpen: false,
      isProfileMenuOpen: false,
      profilePic: ""
    };
  },
  computed: {
  },
  methods: {
    toggleNotifications() {
      this.isNotificationsOpen = !this.isNotificationsOpen;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    },
    handleLogout() {
      const authStore = useAuthStore();
      authStore.signOut();
      // Navigate to the login page using route name
      this.$router.push({ name: 'LandingPage' });
    },
    async fetchProfilePic () {
      const authStore = useAuthStore();
      if (authStore.user) {
        try {
          const userDocRef = doc(db, "users", authStore.user.uid);
          const userSnapshot = await getDoc(userDocRef);
          if (userSnapshot.exists()) {
            console.log("userSnapshot.data().profilePicture ", userSnapshot.data().profilePicture)
            this.profilePic = userSnapshot.data().profilePicture;
            console.log("this.profilePic ", this.profilePic)
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    },
  },
  mounted(){
    this.fetchProfilePic();
  }
};
</script>
