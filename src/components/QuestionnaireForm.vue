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
    <button @click="generateResume">Generate Resume</button>
    <button @click="getTemplates">Get Templates</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from 'axios';

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

async function generateResume() {
  try {
    const response = await axios.post('http://localhost:5000/api/generate-pdf', {
      template: 'professional',
      styling: {
        // Your styling options
      },
      content: {
        // Your resume content
      }
    }, {
      responseType: 'blob' // Important for receiving PDF files
    });
    
    // Create a download link for the PDF
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
}

async function getTemplates() {
  try {
    const response = await axios.get('http://localhost:5000/api/templates');
    console.log('Available templates:', response.data);
  } catch (error) {
    console.error('Error fetching templates:', error);
  }
}
</script>
