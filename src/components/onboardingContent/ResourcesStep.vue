<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6">Explore recommended resources</h3>
    <div class="space-y-4">
      <div
        v-for="(resource, index) in resources"
        :key="index"
        class="bg-gray-100 p-4 rounded"
      >
        <h4 class="text-lg font-semibold mb-2">{{ resource.title }}</h4>
        <p class="mb-2">{{ resource.description }}</p>
        <a
          :href="resource.link"
          target="_blank"
          class="text-blue-600 hover:underline"
          >Learn more</a
        >
      </div>
    </div>
    <div class="flex justify-between mt-6">
      <button
        @click="$emit('prev-step')"
        class="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
      >
        Previous
      </button>
      <button
        @click="$emit('next-step')"
        class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
const resources = [
  {
    title: "Introduction to Programming",
    description:
      "Learn the basics of programming with this comprehensive course.",
    link: "#",
  },
  {
    title: "Business Analytics Fundamentals",
    description: "Discover how to use data to make better business decisions.",
    link: "#",
  },
  {
    title: "Healthcare Administration Essentials",
    description:
      "Explore the key concepts in managing healthcare organizations.",
    link: "#",
  },
];

defineEmits(["next-step", "prev-step"]);
</script>
