<template>
  <div class="bg-white shadow-sm">
    <div class="px-4 h-16 flex items-center justify-between">
      <!-- Search -->
      <div class="flex-1 max-w-lg hidden md:block">
        <div class="relative">
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
        <button @click="toggleNotifications" class="relative p-2 rounded-full hover:bg-gray-100">
          <svg class="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405a2.032 2.032 0 00-.595-1.325L16 11.5V7a6 6 0 00-12 0v4.5l-1 1c-.19.19-.31.45-.31.74v1.76c0 .47.38.86.85.86H9" />
          </svg>
          <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <!-- Profile -->
        <button @click="toggleProfileMenu" class="flex items-center space-x-2">
          <div class="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img v-if="profilePic" :src="profilePic" alt="Profile Picture" class="w-full h-full object-cover" />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      notifications: [],
      isNotificationsOpen: false,
      isProfileMenuOpen: false,
      profilePic: ""
    };
  },
  methods: {
    toggleNotifications() {
      this.isNotificationsOpen = !this.isNotificationsOpen;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
    }
  }
};
</script>
