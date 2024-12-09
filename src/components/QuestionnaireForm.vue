<template>
  <div class="card">
    <h3 class="text-xl font-semibold text-gray-900 mb-6">
      User Feedback Survey
    </h3>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div v-for="q in questions" :key="q.id" class="space-y-4">
        <label
          :for="'q' + q.id"
          class="block text-sm font-medium text-gray-700"
        >
          {{ q.question }}
        </label>

        <!-- Rating Type Question -->
        <div v-if="q.type === 'rating'" class="flex space-x-4">
          <button
            v-for="option in q.options"
            :key="option"
            type="button"
            @click="answers[q.id] = option"
            :class="[
              'w-10 h-10 rounded-full',
              answers[q.id] === option
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
            ]"
          >
            {{ option }}
          </button>
        </div>

        <!-- Choice Type Question -->
        <div v-if="q.type === 'choice'" class="grid grid-cols-2 gap-4">
          <button
            v-for="option in q.options"
            :key="option"
            type="button"
            @click="answers[q.id] = option"
            :class="[
              'px-4 py-2 rounded-lg text-sm',
              answers[q.id] === option
                ? 'bg-primary text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700',
            ]"
          >
            {{ option }}
          </button>
        </div>

        <!-- Text Type Question -->
        <textarea
          v-if="q.type === 'text'"
          :id="'q' + q.id"
          v-model="answers[q.id]"
          rows="3"
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors"
      >
        Submit Feedback
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const questions = ref([
  {
    id: 1,
    type: "rating",
    question: "How satisfied are you with our service?",
    options: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    type: "choice",
    question: "How often do you use our platform?",
    options: ["Daily", "Weekly", "Monthly", "Rarely"],
  },
  {
    id: 3,
    type: "text",
    question: "What improvements would you suggest?",
  },
]);

const answers = ref({});

const submitForm = () => {
  console.log("Form submitted:", answers.value);
};
</script>
