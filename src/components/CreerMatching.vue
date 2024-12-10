<template>
  <div
    class="min-h-screentext-white flex flex-col items-center p-4"
  >
    <!-- Header -->
    <header
      class="w-full flex justify-between items-center py-4 px-6 bg-gray-800 rounded-lg shadow-md"
    >
      <h1 class="text-2xl font-bold text-blue-400">
        Career Matching Questionnaire
      </h1>
    </header>

    <!-- Main Content -->
    <main
      class="w-full mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 px-4"
    >
      <!-- Personal Assessment Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-3">
          Personal Assessment
        </h2>
        <p class="mb-4 text-white">
          Answer the following questions to understand your personality traits
          better:
        </p>
        <div class="space-y-3">
          <label class="block text-white">
            What motivates you the most? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Recognition</option>
              <option>Personal growth</option>
              <option>Financial stability</option>
              <option>Creative expression</option>
            </select>
          </label>

          <label class="block text-white">
            How do you handle stress? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Calmly and thoughtfully</option>
              <option>With physical activity</option>
              <option>By seeking help from others</option>
              <option>I find it difficult to manage stress</option>
            </select>
          </label>
        </div>
      </div>

      <!-- Education Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-3">Education Analysis</h2>
        <p class="mb-4 text-white">Reflect on your current educational background:</p>
        <div class="space-y-3">
          <label class="block text-white">
            What is your highest level of completed education? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>High School Diploma</option>
              <option>Associate Degree</option>
              <option>Bachelor's Degree</option>
              <option>Master's Degree</option>
            </select>
          </label>

          <label class="block text-white">
            Which subjects do you find most engaging? <br />
            <input
              type="text"
              class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
              placeholder="Enter your favorite subjects here..."
            />
          </label>
        </div>
      </div>

      <!-- Behavioral Analytics Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-3">
          Behavioral Analytics
        </h2>
        <p class="mb-4 text-white">
          Answer the following to evaluate your behavior patterns:
        </p>
        <div class="space-y-3">
          <label class="block text-white">
            Do you prefer working independently or as part of a team? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Independently</option>
              <option>As part of a team</option>
            </select>
          </label>

          <label class="block text-white">
            How often do you engage in problem-solving activities? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Rarely</option>
              <option>Almost never</option>
            </select>
          </label>
        </div>
      </div>

      <!-- Emotional Wellness Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-3">Emotional Wellness</h2>
        <p class="mb-4 text-white">
          Your emotional health is key to personal and academic success. Answer
          these questions honestly:
        </p>
        <div class="space-y-3">
          <label class="block text-white">
            How do you rate your overall mood? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Very positive</option>
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
            </select>
          </label>

          <label class="block text-white">
            How often do you feel overwhelmed? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Rarely</option>
              <option>Sometimes</option>
              <option>Frequently</option>
              <option>Always</option>
            </select>
          </label>
        </div>
      </div>

      <!-- Career Preferences Section -->
      <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 class="text-xl font-bold text-blue-400 mb-3">Career Preferences</h2>
        <p class="mb-4 text-white">
          Define your career path goals and explore your interests:
        </p>
        <div class="space-y-3">
          <label class="block text-white">
            Which of the following careers aligns with your interest? <br />
            <select class="w-full mt-1 bg-gray-700 text-white p-2 rounded">
              <option>Software Development</option>
              <option>Healthcare</option>
              <option>Education</option>
              <option>Creative Industries</option>
            </select>
          </label>

          <label class="block text-white">
            What motivates you to pursue this career path? <br />
            <input
              type="text"
              class="w-full mt-1 bg-gray-700 text-white p-2 rounded"
              placeholder="Share your thoughts here..."
            />
          </label>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>