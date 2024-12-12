<template>
  <div class="interactive-tools p-3">
    <h2 class="text-3xl font-semibold mb-6">Interactive Tools</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Career Path Explorer -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Career Path Explorer</h3>
        <p class="mb-4">
          Visualize different career paths and their potential outcomes.
        </p>
        <button
          class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300"
        >
          Explore Careers
        </button>
      </div>

      <!-- Skill Assessment Quiz -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Skill Assessment Quiz</h3>
        <p class="mb-4">Test your skills and identify areas for improvement.</p>
        <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
        >
          Take Quiz
        </button>
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
    </div>
  </div>
</template>

<script setup>
// No additional logic needed for this component
</script>
