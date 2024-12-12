<template>
  <div class="onboarding p-6 bg-gray-100 min-h-screen mb-6" style="overflow-y: hidden">
    <h2 class="text-4xl font-bold mb-3  text-blue-600">Welcome to AI Student Guidance</h2>

    <div v-if="!onboardingStarted && !onboardingCompleted">
      <div class="max-w-2xl">
        <div class="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h3 class="text-2xl font-semibold mb-6">Let's get started!</h3>
          <div class="space-y-6">
            <div
              v-for="(step, index) in onboardingSteps"
              :key="index"
              class="flex items-center"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center mr-4 text-lg font-semibold"
              >
                {{ index + 1 }}
              </div>
              <p class="text-lg">{{ step }}</p>
            </div>
          </div>
        </div>

        <div class="mb-3">
          <button
            @click="startOnboarding"
            class="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            Begin Onboarding
          </button>
        </div>
      </div>
    </div>

    <div class="mb-3" v-else-if="onboardingStarted && !onboardingCompleted">
      <OnboardingSteps :currentStep="currentStep" @complete-onboarding="completeOnboarding" />
    </div>

    <Dashboard class="mb-3" v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import OnboardingSteps from './onboardingContent/OnboardingSteps.vue';
import Dashboard from './onboardingContent/onboardingDashboard.vue';

const onboardingSteps = ref([
  "Complete your profile",
  "Take the initial career assessment",
  "Explore recommended resources",
  "Set your goals and preferences",
]);

const onboardingStarted = ref(false);
const onboardingCompleted = ref(false);
const currentStep = ref(1);

const startOnboarding = () => {
  onboardingStarted.value = true;
};

const completeOnboarding = () => {
  onboardingCompleted.value = true;
};
</script>

