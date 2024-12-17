<template>
  <div
    :class="[
      'bg-gray-800 text-white h-screen fixed lg:relative top-0 bottom-0 z-50',
      isCollapsed ? 'w-16' : 'w-64',
      'transition-all duration-500 ease-in-out',
    ]"
    @mouseleave="closeSidebarOnMouseLeave"
  >
    <div class="flex items-center justify-between p-4">
      <h1
        :class="[
          'font-bold overflow-hidden whitespace-nowrap transition-all duration-500 ease-in-out',
          isCollapsed ? 'text-lg opacity-0' : 'text-2xl opacity-100',
        ]"
      >
        My App
      </h1>

      <!-- Hamburger Button -->
      <button
        @click="toggleSidebar"
        class="p-1 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <component :is="isCollapsed ? Bars3Icon : XMarkIcon" class="w-6 h-6" />
      </button>
    </div>

    <nav class="px-2 py-4 space-y-2 navigation">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        @mouseenter="openSidebarOnHover"
        @click="closeSidebarOnClick"
      >
        <template v-if="isHeroIcon(item.icon)">
          <component :is="item.icon" class="w-5 h-5 transition-all duration-300 ease-in-out" />
        </template>
        <template v-else>
          <font-awesome-icon :icon="item.icon" class="w-5 h-5 text-white transition-all duration-300 ease-in-out" />
        </template>
        <span
          class="ml-3 transition-opacity duration-500 ease-in-out"
          :class="{ 'opacity-0': isCollapsed, 'opacity-100': !isCollapsed }"
        >
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
import { faUsers, faTrophy, faCalendar, faRobot, faSchool, faTools, faBook, faHouse, faChartLine, faUser, faGears } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const isCollapsed = ref(true); // Sidebar starts collapsed

const navigation = [
  { name: 'Dashboard', icon: faHouse, path: '/dashboard' },
  { name: 'Onboarding', icon: faUsers, path: '/onboarding' },
  { name: 'Analytics', icon: faChartLine, path: '/analytics' },
  { name: 'Interactive Tools', icon: faTools, path: '/interactive-tools' },
  { name: 'Content Library', icon: faBook, path: '/content-library' },
  { name: 'Career Matching', icon: faSchool, path: '/career-matching' },
  { name: 'AI Chat Support', icon: faRobot, path: '/ai-chat-support' },
  { name: 'Study Time Table', icon: faCalendar, path: '/timetable' },
  { name: 'Gamification', icon: faTrophy, path: '/gamification' },
  { name: 'Users', icon: faUser, path: '/users' },
  { name: 'Settings', icon: faGears, path: '/settings' },
];

const isHeroIcon = (icon) => [HomeIcon, ChartBarIcon, UsersIcon, CogIcon].includes(icon);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const openSidebarOnHover = () => {
  if (isCollapsed.value) isCollapsed.value = false;
};

const closeSidebarOnClick = () => {
  if (!isCollapsed.value) isCollapsed.value = true;
};

const closeSidebarOnMouseLeave = () => {
  if (!isCollapsed.value) isCollapsed.value = true;
};
</script>

<style scoped>
@media (max-width: 768px) {
  .fixed {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 50;
  }
}
</style>
