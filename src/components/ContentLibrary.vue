<template>
  <div class="content-library p-3">
    <h2 class="text-3xl font-semibold mb-6">Content Library</h2>

    <!-- Language filter -->
    <div class="mb-6">
      <label for="language" class="block text-sm font-medium text-gray-700 mb-2"
        >Language:</label
      >
      <select
        id="language"
        v-model="selectedLanguage"
        class="w-full md:w-64 p-2 border rounded"
      >
        <option value="all">All Languages</option>
        <option value="arabic">Arabic</option>
        <option value="french">French</option>
        <option value="berber">Berber</option>
      </select>
    </div>

    <!-- Content categories -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category.title"
        class="bg-white p-6 rounded-lg shadow-md"
      >
        <h3 class="text-xl font-semibold mb-4">{{ category.title }}</h3>
        <ul class="space-y-2">
          <li
            v-for="item in category.items"
            :key="item"
            class="flex items-center"
          >
            <i class="fas fa-file-alt text-blue-500 mr-2"></i>
            <span>{{ item }}</span>
          </li>
        </ul>
        <button class="mt-4 text-blue-600 hover:underline">View all</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedLanguage = ref("all");

const categories = ref([
  {
    title: "Career Guides",
    items: ["Choosing a Career Path", "Industry Trends", "Job Market Analysis"],
  },
  {
    title: "Skill Development",
    items: ["Communication Skills", "Technical Skills", "Soft Skills"],
  },
  {
    title: "Educational Resources",
    items: ["Study Techniques", "Exam Preparation", "Academic Writing"],
  },
]);
</script>
