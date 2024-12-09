<template>
  <div class="card">
    <h3 class="text-gray-500 text-sm font-medium">{{ title }}</h3>
    <div class="mt-2 flex items-baseline">
      <p class="text-2xl font-semibold text-gray-900">{{ value }}</p>
      <p
        :class="[
          'ml-2 text-sm',
          trend === 'up' ? 'text-green-600' : 'text-red-600',
        ]"
      >
        {{ change }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: String,
  change: String,
  trend: {
    type: String,
    validator: (value) => ["up", "down"].includes(value),
  },
});
</script>
