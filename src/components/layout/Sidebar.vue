<template>
  <div :class="[
    'transition-all duration-300 ease-in-out bg-gray-800 text-white',
    isCollapsed ? 'w-20' : 'w-64'
  ]">
    <div class="flex items-center justify-between p-4">
      <h1 :class="['font-bold transition-all duration-300', isCollapsed ? 'text-lg' : 'text-2xl']">
        {{ isCollapsed ? 'D' : 'Dashboard' }}
      </h1>
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
    
    <nav class="px-2 py-4 space-y-2">
      <router-link
        v-for="item in navigation"
        :key="item.name"
        :to="item.path"
        class="flex items-center px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span
          v-if="!isCollapsed"
          class="ml-3 transition-all duration-300"
        >
          {{ item.name }}
        </span>
      </router-link>
    </nav>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  CogIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/vue/24/outline';

const isCollapsed = ref(false);
const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Analytics', icon: ChartBarIcon, path: '/analytics' },
  { name: 'Users', icon: UsersIcon, path: '/users' },
  { name: 'Settings', icon: CogIcon, path: '/settings' },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>