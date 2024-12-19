<template>
  <div class="bg-white shadow-sm">
    <div class="px-4 h-16 flex items-center justify-between">
      <!-- Search Section -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <!-- Mobile search icon -->
          <button
            @click="toggleSearch"
            class="block sm:hidden p-2 rounded-full hover:bg-gray-100"
            aria-label="Open search"
          >
            <svg
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          <!-- Desktop search input -->
          <div class="hidden md:block relative">
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              @input="debouncedSearch"
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all duration-200 text-gray-700 placeholder-gray-400"
            />
            <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg
                class="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Right section -->
      <div class="flex items-center space-x-4">
        <!-- Mobile Search Icon -->
        <div class="relative lg:hidden">
          <button
            @click="toggleSearch"
            class="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Open search"
          >
            <svg
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
        <!-- Notifications -->
        <div class="relative">
          <button
            @click="toggleNotifications"
            class="relative p-2 rounded-full hover:bg-gray-100 transition"
            aria-label="Notifications"
          >
            <svg
              class="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>

            <span
              v-if="unreadNotifications"
              class="absolute top-0 right-0 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white"
            >
              {{ unreadNotifications }}
            </span>
          </button>

          <!-- Notifications dropdown -->
          <div
            v-if="isNotificationsOpen"
            class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-50"
          >
            <div class="p-4 border-b flex justify-between items-center">
              <h3 class="font-semibold">Notifications</h3>
              <button
                @click="markAllAsRead"
                class="text-sm text-primary-600 hover:text-primary-700"
              >
                Mark all as read
              </button>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div
                v-if="notifications.length === 0"
                class="p-4 text-center text-gray-500"
              >
                No notifications
              </div>
              <div
                v-for="notification in notifications"
                :key="notification.id"
                :class="[
                  'p-4 hover:bg-gray-50 transition',
                  { 'bg-blue-50': !notification.read },
                ]"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0">
                    <img
                      :src="notification.avatar"
                      class="h-8 w-8 rounded-full"
                    />
                  </div>
                  <div class="ml-3 flex-1">
                    <p class="text-sm font-medium">
                      {{ notification.message }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ notification.time }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Profile -->
        <div class="relative">
          <button
            @click="toggleProfileMenu"
            class="flex items-center space-x-2"
            aria-label="User menu"
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
                class="h-full w-full text-gray-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </button>

          <!-- Profile dropdown -->
          <div
            v-if="isProfileMenuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50"
          >
            <div class="py-1">
              <a
                href="/profile"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="/settings"
                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                @click="logout"
                class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Search Modal -->
    <div
      v-if="isSearchOpen"
      class="fixed inset-0 bg-gray-900/50 z-50 sm:block md:hidden"
    >
      <div
        class="absolute inset-x-0 top-0 bg-white p-4 shadow-lg animate-slide-down"
      >
        <div class="relative flex items-center">
          <input
            v-model="searchQuery"
            type="search"
            placeholder="Search anything..."
            aria-label="Search"
            @input="debouncedSearch"
            class="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all duration-200 text-gray-700 placeholder-gray-400"
            autofocus
          />
          <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg
              class="h-5 w-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-4.35-4.35m1.65-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            @click="toggleSearch"
            class="absolute right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            aria-label="Close search"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Mobile search results -->
        <div
          v-if="showSuggestions && searchResults"
          class="mt-2 bg-white rounded-lg max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
          <!-- Pages -->
          <div v-if="searchResults.pages?.length" class="p-2">
            <h3 class="text-xs font-semibold text-gray-500 uppercase mb-2">
              Pages
            </h3>
            <button
              v-for="page in searchResults.pages"
              :key="page.path"
              @click="navigateToResult(page)"
              class="block w-full text-left p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <div class="font-medium">{{ page.title }}</div>
              <div class="text-sm text-gray-500">{{ page.preview }}</div>
            </button>
          </div>
          <!-- Users -->
          <div v-if="searchResults.users?.length" class="p-2 border-t">
            <h3 class="text-xs font-semibold text-gray-500 uppercase mb-2">
              Users
            </h3>
            <button
              v-for="user in searchResults.users"
              :key="user.id"
              @click="navigateToResult(user)"
              class="block w-full text-left p-2 hover:bg-gray-50 rounded cursor-pointer flex items-center"
            >
              <img :src="user.avatar" class="w-8 h-8 rounded-full mr-3" />
              <div>
                <div class="font-medium">{{ user.name }}</div>
                <div class="text-sm text-gray-500">{{ user.email }}</div>
              </div>
            </button>
          </div>
          <!-- Content -->
          <div v-if="searchResults.content?.length" class="p-2 border-t">
            <h3 class="text-xs font-semibold text-gray-500 uppercase mb-2">
              Content
            </h3>
            <button
              v-for="item in searchResults.content"
              :key="item.path"
              @click="navigateToResult(item)"
              class="block w-full text-left p-2 hover:bg-gray-50 rounded cursor-pointer"
            >
              <div class="font-medium">{{ item.title }}</div>
              <div class="text-sm text-gray-500">{{ item.description }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { globalSearch } from "../utils/search";

// Debounce utility function
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

export default {
  components: {
    FontAwesomeIcon,
    faMagnifyingGlass,
    faSearch
  },
  data() {
    return {
      searchQuery: "",
      showSuggestions: false,
      searchResults: null,
      notifications: [
        {
          id: 1,
          message: "John Doe mentioned you in a comment",
          time: "5 minutes ago",
          read: false,
          avatar: "/path-to-avatar.jpg",
        },
        // Add more notifications as needed
      ],
      unreadNotifications: 2,
      isNotificationsOpen: false,
      isProfileMenuOpen: false,
      profilePic: "",
      isSearchOpen: false,
      windowWidth: window.innerWidth,
    };
  },
  created() {
    this.debouncedSearch = debounce(this.handleSearch, 300);
  },
  methods: {
    async handleSearch() {
      if (this.searchQuery.length < 2) {
        this.searchResults = null;
        this.showSuggestions = false;
        return;
      }

      this.searchResults = await globalSearch(this.searchQuery, {
        limit: 5,
        threshold: 0.2,
        types: ["pages", "content", "users"],
      });

      this.showSuggestions = true;
    },
    toggleNotifications() {
      this.isNotificationsOpen = !this.isNotificationsOpen;
      if (this.isProfileMenuOpen) this.isProfileMenuOpen = false;
    },
    toggleProfileMenu() {
      this.isProfileMenuOpen = !this.isProfileMenuOpen;
      if (this.isNotificationsOpen) this.isNotificationsOpen = false;
    },
    toggleSearch() {
      console.log("toggleSearch");
      this.isSearchOpen = !this.isSearchOpen;
      console.log("isSearchOpen", this.isSearchOpen);
      if (this.isSearchOpen) {
        this.$nextTick(() => {
          this.$el.querySelector('input[type="search"]')?.focus();
        });
      }
    },
    markAllAsRead() {
      this.notifications = this.notifications.map((notification) => ({
        ...notification,
        read: true,
      }));
      this.unreadNotifications = 0;
    },
    logout() {
      // Implement logout logic
      console.log("Logging out...");
    },
    handleClickOutside(event) {
      const target = event.target;
      if (!this.$el.contains(target)) {
        this.isNotificationsOpen = false;
        this.isProfileMenuOpen = false;
        this.showSuggestions = false;
      }
    },
    navigateToResult(result) {
      // Close the search suggestions
      this.showSuggestions = false;
      this.searchQuery = "";
      this.isSearchOpen = false;

      // Navigate to the result
      if (result.path) {
        this.$router.push(result.path);
      }
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
    window.removeEventListener("resize", this.onResize);
  },
};
</script>

<style scoped>
.myicon {
  width: 50px;
  height: 50px;
  border: 1px solid orange;
  color: orange;
  background-color: black;
}

@keyframes slide-down {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

.animate-slide-down {
  animation: slide-down 0.2s ease-out forwards;
}
</style>
