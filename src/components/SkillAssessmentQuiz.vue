<template>
  <div class="flex h-screen bg-gray-100 overflow-hidden">
    <!-- Sidebar Component -->
    <Sidebar
      :is-collapsed="isSidebarCollapsed"
      @toggle-sidebar="toggleSidebar"
      class="hidden md:block"
    />

    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Navigation Component -->
      <TopNavigation @toggle-sidebar="toggleSidebar" />

      <div class="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6 lg:p-8">
        <div class="max-w-4xl mx-auto">
          <h1
            class="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8"
          >
            Skill Assessment Quiz
          </h1>

          <!-- Introduction Section -->
          <div class="bg-white shadow-md rounded-lg p-6 mb-8">
            <h2 class="text-2xl font-semibold mb-4">
              Welcome to Your Skill Assessment
            </h2>
            <p class="text-gray-600 mb-4">
              This quiz is designed to help you identify your strengths and
              areas for improvement across various skill categories. Your
              responses will be used to provide personalized feedback and career
              suggestions.
            </p>
            <p class="text-gray-600">
              Please answer each question honestly and to the best of your
              ability. Your results will help guide your personal and
              professional development.
            </p>
          </div>

          <!-- Quiz Section -->
          <form @submit.prevent="submitQuiz">
            <div class="space-y-8">
              <div
                v-for="(category, index) in quizStore.categories"
                :key="index"
                class="bg-white shadow-md rounded-lg p-6"
              >
                <h3 class="text-xl font-semibold mb-4">{{ category.name }}</h3>
                <div
                  v-for="(question, qIndex) in category.questions"
                  :key="qIndex"
                  class="mb-6"
                >
                  <p class="text-gray-700 mb-2">{{ question.text }}</p>
                  <div class="space-y-2">
                    <label
                      v-for="option in question.options"
                      :key="option"
                      class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition duration-150 ease-in-out"
                    >
                      <input
                        type="radio"
                        :name="`question-${index}-${qIndex}`"
                        :value="option"
                        v-model="quizStore.responses[`${index}-${qIndex}`]"
                        class="form-radio h-5 w-5 text-blue-600"
                      />
                      <span class="text-gray-700">{{ option }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              class="w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition duration-300 mt-8 font-semibold"
            >
              Submit Quiz
            </button>
          </form>

          <!-- Results Section -->
          <div
            v-if="quizStore.showResults"
            class="bg-white shadow-md rounded-lg p-6 mt-8"
          >
            <h2 class="text-2xl font-semibold mb-4">Your Results</h2>
            <p class="text-gray-600 mb-4">
              Based on your responses, here's a summary of your skills:
            </p>
            <div class="space-y-2">
              <p
                v-for="(strength, index) in quizStore.strengths"
                :key="`strength-${index}`"
                class="text-green-600 flex items-center"
              >
                <CheckCircle class="w-5 h-5 mr-2" />
                <span>Strength: {{ strength }}</span>
              </p>
              <p
                v-for="(improvement, index) in quizStore.areasForImprovement"
                :key="`improvement-${index}`"
                class="text-yellow-600 flex items-center"
              >
                <AlertCircle class="w-5 h-5 mr-2" />
                <span>Area for Improvement: {{ improvement }}</span>
              </p>
            </div>
            <p class="text-gray-700 my-4">
              {{ quizStore.personalizedFeedback }}
            </p>
            <h3 class="text-xl font-semibold mb-2">
              Suggested Development Activities:
            </h3>
            <ul class="list-disc list-inside space-y-2">
              <li
                v-for="(suggestion, index) in quizStore.suggestions"
                :key="`suggestion-${index}`"
                class="text-blue-600"
              >
                {{ suggestion }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useQuizStore } from "../stores/quizStore";
import Sidebar from "./Sidebar.vue";
import TopNavigation from "./TopNavigation.vue";
import { CheckCircle, AlertCircle } from "lucide-vue-next";

const quizStore = useQuizStore();
const isSidebarCollapsed = ref(false);

function toggleSidebar() {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
}

function submitQuiz() {
  if (quizStore.validateResponses()) {
    quizStore.processResults();
    quizStore.showResults = true;
  } else {
    alert("Please answer all questions before submitting.");
  }
}

// Initialize responses object
quizStore.categories.forEach((category, categoryIndex) => {
  category.questions.forEach((_, questionIndex) => {
    quizStore.responses[`${categoryIndex}-${questionIndex}`] = null;
  });
});
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
