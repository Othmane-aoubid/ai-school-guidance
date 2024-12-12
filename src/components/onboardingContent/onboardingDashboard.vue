<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-3xl font-bold mb-6 text-blue-600">
      Your AI Student Guidance Dashboard
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3">Profile Information</h3>
        <p><strong>Name:</strong> {{ userInfo.name }}</p>
        <p><strong>Email:</strong> {{ userInfo.email }}</p>
        <p><strong>Education Level:</strong> {{ userInfo.education }}</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3">Career Assessment</h3>
        <p><strong>Interested Field:</strong> {{ userInfo.interestedField }}</p>
        <p>
          <strong>Learning Preference:</strong>
          {{ userInfo.learningPreference }}
        </p>
        <p>
          <strong>Ideal Work Environment:</strong>
          {{ userInfo.workEnvironment }}
        </p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3">Goals and Preferences</h3>
        <p><strong>Career Goal:</strong> {{ userInfo.careerGoal }}</p>
        <p>
          <strong>Study Time:</strong> {{ userInfo.studyTime }} hours per week
        </p>
        <p><strong>Learning Style:</strong> {{ userInfo.learningStyle }}</p>
      </div>

      <div class="bg-gray-100 p-4 rounded-lg">
        <h3 class="text-xl font-semibold mb-3">Recommended Resources</h3>
        <ul class="list-disc pl-5">
          <li
            v-for="(resource, index) in userInfo.recommendedResources"
            :key="index"
          >
            <a
              :href="resource.link"
              target="_blank"
              class="text-blue-600 hover:underline"
              >{{ resource.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="mt-8 text-center">
      <button
        @click="startLearning"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Start Learning
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// In a real application, this data would come from a store or API
const userInfo = ref({
  name: "John Doe",
  email: "john@example.com",
  education: "Undergraduate",
  interestedField: "Technology",
  learningPreference: "Visual",
  workEnvironment: "Remote",
  careerGoal: "Become a Full Stack Developer",
  studyTime: 15,
  learningStyle: "Visual",
  recommendedResources: [
    { title: "Introduction to Web Development", link: "#" },
    { title: "JavaScript Fundamentals", link: "#" },
    { title: "Building Responsive Websites", link: "#" },
  ],
});

const startLearning = () => {
  // This function would typically navigate to the main learning interface
  console.log("Starting the learning journey!");
};
</script>
