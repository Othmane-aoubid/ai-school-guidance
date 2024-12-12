<template>
  <div class="onboarding p-3">
    <h2 class="text-3xl font-semibold mb-6">Welcome to AI Student Guidance</h2>

    <div class="max-w-2xl">
      <div class="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 class="text-xl font-semibold mb-4">Let's get started!</h3>
        <div class="space-y-4">
          <div
            v-for="(step, index) in onboardingSteps"
            :key="index"
            class="flex items-center"
          >
            <div
              class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4"
            >
              {{ index + 1 }}
            </div>
            <p>{{ step }}</p>
          </div>
        </div>
      </div>

      <div class="text-center">
        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Begin Onboarding
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const onboardingSteps = ref([
  "Complete your profile",
  "Take the initial career assessment",
  "Explore recommended resources",
  "Set your goals and preferences",
]);
</script>
