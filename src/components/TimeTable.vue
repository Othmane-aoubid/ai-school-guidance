<template>
    <div class="min-h-screen text-white flex flex-col items-center p-4">
      <!-- Header -->
      <header class="w-full flex justify-between items-center py-4 px-6 bg-gray-800 rounded-lg shadow-md" style="background-color:#1F2937">
        <h1 class="text-2xl font-bold text-blue-400">Study Timetable</h1>
      </header>
  
      <!-- Main Content -->
      <main class="w-full mt-6 px-4 lg:px-12 lg:mt-8">
        <h2 class="text-xl font-bold text-blue-400 mb-4 text-center">Plan Your Weekly Study Routine</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Study Time Blocks -->
          <div
            v-for="(day, index) in weekDays"
            :key="index"
            class="bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <h3 class="text-lg font-bold text-center mb-3">{{ day }}</h3>
            <div class="space-y-2">
              <label class="block">
                <input
                  type="text"
                  class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
                  :placeholder="`8:00 AM - 10:00 AM (Subject/Topic)`"
                />
              </label>
              <label class="block">
                <input
                  type="text"
                  class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
                  :placeholder="`10:15 AM - 12:15 PM (Subject/Topic)`"
                />
              </label>
              <label class="block">
                <input
                  type="text"
                  class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
                  :placeholder="`1:00 PM - 3:00 PM (Subject/Topic)`"
                />
              </label>
              <label class="block">
                <input
                  type="text"
                  class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
                  :placeholder="`3:15 PM - 5:15 PM (Subject/Topic)`"
                />
              </label>
              <label class="block">
                <input
                  type="text"
                  class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
                  :placeholder="`Evening Study Time`"
                />
              </label>
            </div>
          </div>
        </div>
  
        <!-- Save and View Progress Section -->
        <div class="mt-6 p-4 rounded-lg shadow-lg">
          <h3 class="text-lg font-bold mb-3 text-blue-400 text-center">Save Your Weekly Plan</h3>
          <div class="flex justify-center space-x-4">
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              @click="savePlan"
            >
              Save Plan
            </button>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
              @click="clearPlan"
            >
              Clear Plan
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        weekDays: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        studyPlan: {},
      };
    },
    methods: {
      savePlan() {
        alert("Study Plan saved successfully!");
        console.log("Saved Plan:", this.studyPlan);
      },
      clearPlan() {
        alert("Clearing study plan...");
        this.studyPlan = {};
      },
    },
  };
  </script>
  
  <style scoped>
  /* Customizations for responsiveness */
  input:focus {
    outline: none;
  }
  </style>
  