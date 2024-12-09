<template>
  <div class="flex h-screen bg-gray-100">
    <Sidebar />
    <div class="flex-1 flex flex-col overflow-hidden">
      <TopNavigation />
      <main class="flex-1 overflow-auto p-6">
        <div class="space-y-6">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              v-for="stat in stats"
              :key="stat.name"
              class="bg-white p-6 rounded-lg shadow-sm"
            >
              <div class="flex items-center">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-600">{{ stat.name }}</p>
                  <p class="mt-1 text-xl font-semibold text-gray-900">{{ stat.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-medium text-gray-900 mb-4">Weekly Revenue</h3>
              <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p class="text-gray-500">Revenue Chart Placeholder</p>
              </div>
            </div>
            
            <div class="bg-white p-6 rounded-lg shadow-sm">
              <h3 class="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
              <div class="h-64 bg-gray-50 rounded flex items-center justify-center">
                <p class="text-gray-500">User Growth Chart Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

import Sidebar from '../components/Sidebar.vue';
import TopNavigation from '../components/TopNavigation.vue';

const stats = ref([
  { name: 'Total Users', value: '0', icon: 'users' },
  { name: 'Active Projects', value: '0', icon: 'folder' },
  { name: 'Revenue', value: '$0', icon: 'currency-dollar' },
  { name: 'Conversion Rate', value: '0%', icon: 'chart-bar' }
]);

const recentActivity = ref([]);

onMounted(async () => {
  // Simulated data loading - replace with actual Firebase queries
  stats.value = [
    { name: 'Total Users', value: '1,234', icon: 'users' },
    { name: 'Active Projects', value: '42', icon: 'folder' },
    { name: 'Revenue', value: '$12,345', icon: 'currency-dollar' },
    { name: 'Conversion Rate', value: '25%', icon: 'chart-bar' }
  ];
});
</script>
