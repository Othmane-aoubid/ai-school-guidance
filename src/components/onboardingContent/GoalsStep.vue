<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6">Set your goals and preferences</h3>
    <form @submit.prevent="submitGoals" class="space-y-4">
      <div>
        <label for="career-goal" class="block mb-1">Career Goal</label>
        <input
          type="text"
          id="career-goal"
          v-model="careerGoal"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label for="study-time" class="block mb-1"
          >Preferred Study Time (hours per week)</label
        >
        <input
          type="number"
          id="study-time"
          v-model="studyTime"
          required
          min="1"
          max="168"
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label for="learning-style" class="block mb-1"
          >Preferred Learning Style</label
        >
        <select
          id="learning-style"
          v-model="learningStyle"
          required
          class="w-full px-3 py-2 border rounded"
        >
          <option value="">Select learning style</option>
          <option value="visual">Visual</option>
          <option value="auditory">Auditory</option>
          <option value="reading">Reading/Writing</option>
          <option value="kinesthetic">Kinesthetic</option>
        </select>
      </div>
      <div class="flex justify-between">
        <button
          @click="$emit('prev-step')"
          class="bg-gray-300 text-gray-800 px-6 py-2 rounded hover:bg-gray-400"
        >
          Previous
        </button>
        <button
          type="submit"
          class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Finish
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const careerGoal = ref("");
const studyTime = ref(10);
const learningStyle = ref("");

const emit = defineEmits(["prev-step"]);

const submitGoals = () => {
  console.log("Goals submitted:", {
    careerGoal: careerGoal.value,
    studyTime: studyTime.value,
    learningStyle: learningStyle.value,
  });
  // Here you would typically save the goals and complete the onboarding process
  alert("Onboarding completed! Welcome to AI Student Guidance.");
};
</script>
