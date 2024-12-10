<template>
  <div :class="[
    'transition-all duration-300 ease-in-out bg-gray-800 text-white',
    isCollapsed ? 'w-16' : 'w-64', // Sidebar collapses to 16 width, expands to 64 width
  ]">
    <div class="flex items-center justify-between p-4">
      <!-- Logo / Title -->
      <h1 :class="[
        'font-bold transition-all duration-300',
        isCollapsed ? 'text-lg' : 'text-2xl'
      ]">
        {{ isCollapsed ? '' : 'My App' }}
      </h1>

      <!-- Hamburger Button (Always visible) -->
      <button
        @click="toggleSidebar"
        class="p-1 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <component
          :is="isCollapsed ? Bars3Icon : XMarkIcon"
          class="w-6 h-6"
        />
      </button>
    </div>

    <!-- Navigation Links -->
    <nav class="px-2 py-4 space-y-2">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        @click="handleNavigationClick"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <!-- Show text when sidebar is expanded -->
        <span v-if="!isCollapsed" class="ml-3 transition-all duration-300">
          {{ item.name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import { HomeIcon, ChartBarIcon, UsersIcon, CogIcon } from '@heroicons/vue/24/outline';

const isCollapsed = ref(false); // Sidebar state (collapsed or expanded)

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Career Matching', icon: ChartBarIcon, path: '/CareerMatching' },
  { name: 'Ai Chat Support', icon: ChartBarIcon, path: '/Aichatsupport' },
  { name: 'Study Time Table', icon: ChartBarIcon, path: '/timetable' },
  { name: 'Gamificationt', icon: ChartBarIcon, path: '/gamificationt' },
  { name: 'Users', icon: UsersIcon, path: '/users' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
];

// Toggle the sidebar state between collapsed and expanded
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// Close the sidebar when a navigation item is clicked (mobile view)
const handleNavigationClick = () => {
  if (isCollapsed.value) {
    // If sidebar is collapsed, toggle it to expand
    toggleSidebar();
  }
};
</script>

<style scoped>
/* Small screen - collapsed sidebar */
@media (max-width: 768px) {
  .sidebar {
    transition: width 0.3s ease;
    width: 60px;  /* Collapsed width (small screens) */
  }
}

/* Always visible burger menu button, even on larger screens */
@media (min-width: 768px) {
  .sidebar button {
    display: block; /* Make the button visible on larger screens */
  }
}
</style>
