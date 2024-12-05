<template>
  <div class="bg-white shadow-sm">
    <div class="px-4 h-16 flex items-center justify-between">
      <!-- Search -->
      <div class="flex-1 max-w-lg">
        <div class="relative">
          <MagnifyingGlassIcon class="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
        </div>
      </div>

      <!-- Right section -->
      <div class="flex items-center space-x-4">
        <!-- Notifications -->
        <Menu as="div" class="relative">
          <MenuButton class="relative p-2 rounded-full hover:bg-gray-100">
            <BellIcon class="h-6 w-6 text-gray-600" />
            <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
            <div class="px-4 py-2 text-sm font-medium text-gray-700 border-b">
              Notifications
            </div>
            <MenuItem v-for="notification in notifications" :key="notification.id" v-slot="{ active }">
              <div :class="[
                'px-4 py-2 text-sm cursor-pointer',
                active ? 'bg-gray-100' : ''
              ]">
                <div class="font-medium text-gray-900">{{ notification.text }}</div>
                <div class="text-xs text-gray-500">{{ notification.time }}</div>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>

        <!-- Profile -->
        <Menu as="div" class="relative">
          <MenuButton class="flex items-center space-x-2">
            <UserCircleIcon class="h-8 w-8 text-gray-600" />
          </MenuButton>
          <MenuItems class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 ring-1 ring-black ring-opacity-5">
            <MenuItem v-slot="{ active }">
              <a href="#" :class="[
                'block px-4 py-2 text-sm',
                active ? 'bg-gray-100' : ''
              ]">
                Profile Settings
              </a>
            </MenuItem>
            <MenuItem v-slot="{ active }">
              <button
                @click="handleLogout"
                :class="[
                  'block w-full text-left px-4 py-2 text-sm text-red-600',
                  active ? 'bg-gray-100' : ''
                ]"
              >
                Sign Out
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  UserCircleIcon
} from '@heroicons/vue/24/outline';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore();
const searchQuery = ref('');
const notifications = ref([
  { id: 1, text: 'New user registered', time: '5m ago' },
  { id: 2, text: 'Server update completed', time: '1h ago' }
]);

const handleLogout = async () => {
  await authStore.signOut();
};
</script>