<template>
  <div style="overflow-y:scroll; height:300px">
    <h3 class="text-2xl font-semibold mb-6">
      Take the initial career assessment
    </h3>
    <form @submit.prevent="submitAssessment" class="space-y-4">
      <div v-for="(question, index) in questions" :key="index" class="mb-4">
        <p class="mb-2">{{ question.text }}</p>
        <div class="space-y-2">
          <label
            v-for="option in question.options"
            :key="option"
            class="flex items-center"
          >
            <input
              type="radio"
              :name="'question' + index"
              :value="option"
              v-model="answers[index]"
              required
              class="mr-2"
            />
            {{ option }}
          </label>
        </div>
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
          Next
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const questions = [
  {
    text: "What field are you most interested in?",
    options: ["Technology", "Business", "Healthcare", "Arts"],
  },
  {
    text: "How do you prefer to learn?",
    options: ["Visual", "Auditory", "Reading/Writing", "Kinesthetic"],
  },
  {
    text: "What's your ideal work environment?",
    options: ["Office", "Remote", "Hybrid", "Outdoors"],
  },
];

const answers = ref(Array(questions.length).fill(""));

const emit = defineEmits(["next-step", "prev-step"]);

const submitAssessment = () => {
  console.log("Assessment submitted:", answers.value);
  emit("next-step");
};
</script>
