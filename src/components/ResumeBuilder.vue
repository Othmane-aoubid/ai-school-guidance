<template>
  <div class="w-full flex flex-col items-center justify-center bg-gray-50">
    <!-- Step 1: Landing Page -->
    <div
      v-if="currentStep === 0"
      class="text-center px-4"
      style="height: 500px"
    >
      <h1 class="text-2xl md:text-3xl font-bold mb-6">Let's get started</h1>
      <button
        @click="currentStep = 1"
        class="bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-900"
      >
        Upload Resume
      </button>
      <p class="text-gray-600 mt-2">
        (For tailored course, skill & career development recommendations)
      </p>
      <p class="my-4 font-semibold text-gray-500">OR</p>
      <button
        @click="currentStep = 1"
        class="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
      >
        Build A Custom Resume
      </button>
      <p class="text-orange-500 mt-2">
        (Generate a resume tailored to your degree, interests, and university
        best practices in minutes)
      </p>
    </div>

    <!-- Step 2: Major and Degree Selection -->
    <div
      v-if="currentStep === 1"
      class="w-full max-w-lg bg-white p-6 rounded-md shadow-md"
    >
      <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
      <p class="font-bold text-gray-700 text-lg mb-2">0% Completed</p>
      <div class="h-2 w-full bg-gray-200 rounded-full mb-6">
        <div class="h-2 bg-orange-500 rounded-full" style="width: 0%"></div>
      </div>
      <p class="mb-6 text-gray-500">Currently: Major</p>

      <div class="mb-4">
        <p class="mb-2">What are you seeking?</p>
        <label class="inline-flex items-center">
          <input
            type="radio"
            name="seek"
            value="Internship"
            v-model="seekType"
            class="mr-2"
          />
          Internship
        </label>
        <label class="inline-flex items-center ml-4">
          <input
            type="radio"
            name="seek"
            value="Job"
            v-model="seekType"
            class="mr-2"
          />
          Job
        </label>
      </div>

      <div class="mb-4">
        <label class="block mb-2">What is your major?</label>
        <select v-model="major" class="w-full px-3 py-2 border rounded-md">
          <option disabled selected value="">Select your major</option>
          <option>Computer Science</option>
          <option>Business Administration</option>
          <option>Mechanical Engineering</option>
        </select>
      </div>

      <div class="mb-4">
        <label class="block mb-2">What is your degree?</label>
        <select v-model="degree" class="w-full px-3 py-2 border rounded-md">
          <option disabled selected value="">Select your degree</option>
          <option>Bachelor's</option>
          <option>Master's</option>
          <option>PhD</option>
        </select>
      </div>

      <button
        @click="currentStep = 2"
        class="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
      >
        Next >
      </button>
    </div>

    <!-- Step 3: Keyword Selection -->
    <div
      v-if="currentStep === 2"
      class="w-full max-w-3xl bg-white p-6 rounded-md shadow-md"
    >
      <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
      <p class="font-bold text-gray-700 text-lg mb-2">10% Completed</p>
      <div class="h-2 w-full bg-gray-200 rounded-full mb-6">
        <div class="h-2 bg-orange-500 rounded-full" style="width: 10%"></div>
      </div>
      <p class="mb-6 text-gray-500">Currently: Keyword Selection</p>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div
          v-for="(category, index) in categories"
          :key="index"
          class="flex items-center"
        >
          <input
            type="checkbox"
            :value="category"
            v-model="selectedKeywords"
            :disabled="
              selectedKeywords.length >= 3 &&
              !selectedKeywords.includes(category)
            "
            class="mr-2"
          />
          <label>{{ category }}</label>
        </div>
      </div>

      <div>
        <label class="block text-orange-500 font-semibold mb-2">
          Do you have prior experience in the selected areas?
        </label>
        <select
          v-model="priorExperience"
          class="w-full px-3 py-2 border rounded-md"
        >
          <option disabled selected value="">Select experience level</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="currentStep = 1"
          class="text-orange-500 hover:underline"
        >
          < Prev
        </button>
        <button
          @click="currentStep = 3"
          class="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          Next >
        </button>
      </div>
    </div>

    <!-- Step 4: Skills Input -->
    <div
      v-if="currentStep === 3"
      class="w-full max-w-lg bg-white p-6 rounded-md shadow-md"
    >
      <h2 class="text-2xl font-bold mb-4">Your Progress</h2>
      <p class="font-bold text-gray-700 text-lg mb-2">70% Completed</p>
      <div class="h-2 w-full bg-gray-200 rounded-full mb-6">
        <div class="h-2 bg-orange-500 rounded-full" style="width: 70%"></div>
      </div>
      <p class="mb-6 text-gray-500">Currently: Skills Input</p>

      <div>
        <label class="block mb-2">List Your Skills</label>
        <textarea
          v-model="skills"
          class="w-full border rounded-md px-3 py-2"
          rows="4"
        ></textarea>
      </div>

      <div class="flex justify-between mt-6">
        <button
          @click="currentStep = 2"
          class="text-orange-500 hover:underline"
        >
          < Prev
        </button>
        <button
          @click="currentStep = 4"
          class="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600"
        >
          Next >
        </button>
      </div>
    </div>

    <!-- Step 5: Review -->
    <div
      v-if="currentStep === 4"
      class="w-full max-w-lg bg-white p-6 rounded-md shadow-md"
    >
      <h2 class="text-2xl font-bold mb-4">Review & Submit</h2>
      <p>Verify all your details before submission:</p>
      <ul class="list-disc pl-5 mb-6">
        <li><strong>Seek:</strong> {{ seekType }}</li>
        <li><strong>Major:</strong> {{ major }}</li>
        <li><strong>Degree:</strong> {{ degree }}</li>
        <li><strong>Skills:</strong> {{ skills }}</li>
      </ul>

      <button
        @click="submitForm"
        class="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 0,
      seekType: "",
      major: "",
      degree: "",
      selectedKeywords: [],
      priorExperience: "",
      skills: "",
      categories: [
        "UI Design",
        "Web Development",
        "UX Research",
        "Coding",
        "Marketing",
      ],
    };
  },
  methods: {
    submitForm() {
      alert("Form Submitted Successfully!");
    },
  },
};
</script>
