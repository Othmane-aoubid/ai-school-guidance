<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 md:p-8">
    <div
      class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <div class="p-6 md:p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          Career Guidance Assistant
        </h1>
        <p class="text-gray-600 mb-6">
          Fill in the form below to get personalized career advice
        </p>

        <form @submit.prevent="submitForm" class="space-y-6">
          <div>
            <label
              for="currentRole"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Current Role</label
            >
            <input
              id="currentRole"
              v-model="formData.currentRole"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Student, Marketing Assistant, Unemployed"
            />
          </div>

          <div>
            <label
              for="interests"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Interests</label
            >
            <textarea
              id="interests"
              v-model="formData.interests"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What kind of work or activities do you enjoy?"
            ></textarea>
          </div>

          <div>
            <label
              for="skills"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Skills</label
            >
            <textarea
              id="skills"
              v-model="formData.skills"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="List your key skills"
            ></textarea>
          </div>

          <div>
            <label
              for="education"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Highest Education Level</label
            >
            <select
              id="education"
              v-model="formData.education"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select education level</option>
              <option value="high_school">High School</option>
              <option value="associate">Associate's Degree</option>
              <option value="bachelor">Bachelor's Degree</option>
              <option value="master">Master's Degree</option>
              <option value="phd">Ph.D. or Doctorate</option>
            </select>
          </div>

          <div>
            <label
              for="experience"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Years of Work Experience</label
            >
            <input
              id="experience"
              v-model="formData.experience"
              type="number"
              min="0"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter number of years"
            />
          </div>

          <div>
            <label
              for="goals"
              class="block text-sm font-medium text-gray-700 mb-1"
              >Career Goals</label
            >
            <textarea
              id="goals"
              v-model="formData.goals"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="What are your short-term and long-term career goals?"
            ></textarea>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            {{ loading ? "Getting Guidance..." : "Get Career Guidance" }}
          </button>
        </form>

        <div v-if="error" class="mt-6 p-4 bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>

        <div v-if="guidance" class="mt-6 p-4 bg-blue-50 rounded-md">
          <h2 class="text-xl font-semibold mb-2 text-gray-800">
            Your Personalized Guidance:
          </h2>
          <p class="text-gray-700 whitespace-pre-wrap">{{ guidance }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        currentRole: "",
        interests: "",
        skills: "",
        education: "",
        experience: "",
        goals: "",
      },
      guidance: "",
      loading: false,
      error: "",
    };
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = "";
      this.guidance = "";

      const flowIdOrName = "adviso-ai";
      const langflowId = "f50c47f9-1369-45b4-921a-116e7d66334f";
      const inputValue = Object.values(this.formData).join(", ");

      const tweaks = {
        "TextInput-MG4FD": { input_value: this.formData.currentRole },
        "TextInput-DGLW3": { input_value: this.formData.education },
        "TextInput-jfa7v": { input_value: this.formData.experience },
        "TextInput-v3vRX": { input_value: "Not Specified" },
        "TextInput-8x72p": { input_value: this.formData.currentRole },
        "TextInput-bI1FK": { input_value: this.formData.interests },
        "TextInput-c2jGw": { input_value: this.formData.experience },
        "TextInput-T8wYu": { input_value: "Not Specified" },
      };

      try {
        const response = await fetch(
          `https://api.langflow.astra.datastax.com/lf/${langflowId}/api/v1/run/${flowIdOrName}?stream=false`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "AstraCS:HjTgZprILzswxPdhUjYujNTS:d8d36aabb1b15c848f11c760d808e928fcb0717ea9403927ade670b7aa71e04a",
            },
            body: JSON.stringify({
              input_value: inputValue,
              input_type: "chat",
              output_type: "chat",
              tweaks: tweaks,
            }),
          }
        );

        const responseMessage = await response.json();
        if (!response.ok) {
          throw new Error(
            `${response.status} ${response.statusText} - ${JSON.stringify(
              responseMessage
            )}`
          );
        }

        if (responseMessage && responseMessage.outputs) {
          const flowOutputs = responseMessage.outputs[0];
          const firstComponentOutputs = flowOutputs.outputs[0];
          const output = firstComponentOutputs.outputs.message;
          this.guidance = output.message.text;
        }
      } catch (error) {
        console.error("Error:", error);
        this.error =
          "An error occurred while fetching guidance. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styles here */
</style>
