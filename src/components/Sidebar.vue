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
        <!-- Check if the icon is a Heroicon or FontAwesome icon -->
        <template v-if="isHeroIcon(item.icon)">
          <component :is="item.icon" class="w-5 h-5" />
        </template>
        <template v-else>
          <font-awesome-icon :icon="item.icon" class="w-5 h-5 text-white" style="color: #FFFFFF !important" />
        </template>
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
import { faUsers, faTrophy, faCalendar, faRobot, faSchool  } from '@fortawesome/free-solid-svg-icons'; // Import Font Awesome icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const isCollapsed = ref(false); // Sidebar state (collapsed or expanded)

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/dashboard' },
  { name: 'Onboarding', icon: faUsers, path: '/Onboarding' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Career Matching', icon: faSchool, path: '/CareerMatching' }, // Career Matching FontAwesome icon
  { name: 'AI Chat Support', icon: faRobot, path: '/Aichatsupport' }, // AI Chat Support FontAwesome icon
  { name: 'Study Time Table', icon: faCalendar, path: '/timetable' }, // Study Time Table FontAwesome icon
  { name: 'Gamification', icon: faTrophy, path: '/gamificationt' }, // Gamification FontAwesome icon
  { name: 'Users', icon: UsersIcon, path: '/users' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
];

const isHeroIcon = (icon) => {
  return [HomeIcon, ChartBarIcon, UsersIcon, CogIcon].includes(icon);
};

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
