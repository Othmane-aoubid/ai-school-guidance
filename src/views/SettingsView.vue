<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const currentSettings = ref({
  notifications: true,
  emailUpdates: false,
  darkMode: false,
  language: 'en'
});

const languages = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' }
];

const saveSettings = () => {
  // Implement settings save functionality
  console.log('Settings saved:', currentSettings.value);
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900">Settings</h1>

    <div class="bg-white rounded-lg shadow-sm">
      <div class="p-6 space-y-6">
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
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                currentSettings.notifications ? 'bg-primary' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  currentSettings.notifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
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
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                currentSettings.emailUpdates ? 'bg-primary' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  currentSettings.emailUpdates ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
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
</template>