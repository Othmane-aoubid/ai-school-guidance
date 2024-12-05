<script setup lang="ts">
import { ref, onMounted } from 'vue';

const metrics = ref([
  { name: 'Page Views', value: '0', change: '+0%' },
  { name: 'Bounce Rate', value: '0%', change: '0%' },
  { name: 'Average Session', value: '0m', change: '0%' },
  { name: 'Conversion Rate', value: '0%', change: '0%' }
]);

onMounted(() => {
  // Simulated analytics data
  metrics.value = [
    { name: 'Page Views', value: '45,232', change: '+23%' },
    { name: 'Bounce Rate', value: '32%', change: '-12%' },
    { name: 'Average Session', value: '4m 23s', change: '+8%' },
    { name: 'Conversion Rate', value: '3.2%', change: '+14%' }
  ];
});
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900">Analytics</h1>

    <!-- Metrics Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="metric in metrics"
        :key="metric.name"
        class="bg-white p-6 rounded-lg shadow-sm"
      >
        <p class="text-sm font-medium text-gray-600">{{ metric.name }}</p>
        <p class="mt-2 text-xl font-semibold text-gray-900">{{ metric.value }}</p>
        <p :class="[
          'mt-2 text-sm',
          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
        ]">
          {{ metric.change }}
        </p>
      </div>
    </div>

    <!-- Detailed Analytics -->
    <div class="grid grid-cols-1 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Traffic Sources</h3>
        <div class="h-96 bg-gray-50 rounded flex items-center justify-center">
          <p class="text-gray-500">Traffic Sources Chart Placeholder</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm">
        <h3 class="text-lg font-medium text-gray-900 mb-4">User Behavior</h3>
        <div class="h-96 bg-gray-50 rounded flex items-center justify-center">
          <p class="text-gray-500">User Behavior Chart Placeholder</p>
        </div>
      </div>
    </div>
  </div>
</template>