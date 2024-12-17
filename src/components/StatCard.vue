<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
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

<script>
export default {
  name: 'MyComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    change: {
      type: String,
      required: true
    },
    trend: {
      type: String,
      validator(value) {
        return ["up", "down"].includes(value);
      },
      required: true
    }
  }
};
</script>

