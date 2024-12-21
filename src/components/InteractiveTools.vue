<template>
  <div class="interactive-tools p-3">
    <h2 class="text-3xl font-semibold mb-6">Interactive Tools</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Career Path Explorer -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Job Search</h3>
        <p class="mb-4">
          Search for jobs based on your skills, experience, and preferences.
        </p>
        <router-link to="/job-search">
          <button
            class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
          >
            Search Jobs
          </button>
        </router-link>
      </div>

      <!-- Skill Assessment Quiz -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Skill Assessment Quiz</h3>
        <p class="mb-4">Test your skills and identify areas for improvement.</p>
        <router-link to="/skill-assessment">
        <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
            Take Quiz
          </button>
        </router-link>
      </div>

      <!-- Virtual Job Shadow -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Virtual Job Shadow</h3>
        <p class="mb-4">
          Experience a day in the life of different professionals.
        </p>
        <button
          class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Start Shadowing
        </button>
      </div>
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Resume Builder</h3>
        <p class="mb-4">Build youre own custome resume</p>
        <router-link to="/resume-builder">
          <button
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Build Resume
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
