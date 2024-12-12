<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6">Complete your profile</h3>
    <form @submit.prevent="submitProfile" class="space-y-4">
      <div>
        <label for="name" class="block mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          v-model="name"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label for="email" class="block mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          class="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label for="education" class="block mb-1"
          >Current Education Level</label
        >
        <select
          id="education"
          v-model="education"
          required
          class="w-full px-3 py-2 border rounded"
        >
          <option value="">Select education level</option>
          <option value="high_school">High School</option>
          <option value="undergraduate">Undergraduate</option>
          <option value="graduate">Graduate</option>
        </select>
      </div>
      <div class="flex justify-end">
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

const name = ref("");
const email = ref("");
const education = ref("");

const emit = defineEmits(["next-step"]);

const submitProfile = () => {
  // Here you would typically save the profile data
  console.log("Profile submitted:", {
    name: name.value,
    email: email.value,
    education: education.value,
  });
  emit("next-step");
};
</script>
