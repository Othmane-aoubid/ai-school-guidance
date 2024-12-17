<template>
  <div class="bg-gray-50 p-8 overflow-auto" style="height:500px !important">
    <h1 class="text-2xl font-bold text-blue-400 mb-3">
        Onboarding:
      </h1>
    <!-- Tabs Section -->
    <div class="flex border-b border-gray-300 mb-6">
      <button
        class="px-6 py-2 text-sm font-semibold border-b-2"
        :class="activeTab === 'career' ? 'border-black text-black' : 'border-transparent text-gray-500'"
        @click="activeTab = 'career'"
      >
        Career Plan
      </button>
      <button
        class="px-6 py-2 text-sm font-semibold border-b-2"
        :class="activeTab === 'personal' ? 'border-black text-black' : 'border-transparent text-gray-500'"
        @click="activeTab = 'personal'"
      >
        Personal Plan
      </button>
    </div>

    <!-- Year Selection -->
    <div class="flex space-x-4 mb-6">
      <button
        v-for="(year, index) in years"
        :key="index"
        @click="selectedYear = year"
        class="px-4 py-2 text-sm font-semibold rounded-md"
        :class="selectedYear === year ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'"
      >
        {{ year }}
      </button>
    </div>

    <!-- Personal Plan Content -->
    <div v-if="activeTab === 'personal'">
      <!-- Buttons Section -->
      <div class="flex items-center space-x-4 mb-6">
        <button
          class="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-blue-600"
          @click="selectSemester('Semester 1')"
        >
          Semester 1
        </button>
        <button
          class="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-md shadow-md hover:bg-green-600"
          @click="addSemester"
        >
          + Add Semester
        </button>
      </div>

      <!-- Semester Content -->
      <div v-for="(semester, index) in semesters" :key="index" class="mb-6">
        <h3 class="text-lg font-semibold text-gray-800">{{ semester }}</h3>
        <div class="space-y-4">
          <p class="text-sm text-gray-600">Content for {{ semester }}</p>
        </div>
      </div>
    </div>

    <!-- Progress Tracker Content -->
    <div v-else class="space-y-8">
      <!-- Task Item -->
      <div
        v-for="(task, index) in tasks[selectedYear]"
        :key="index"
        class="flex items-start space-x-4"
      >
        <!-- Checkbox -->
        <input
          type="checkbox"
          v-model="task.completed"
          class="mt-2 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />

        <!-- Task Content -->
        <div class="flex-1 border-l-4 p-4 rounded-md shadow-md"
             :class="task.completed ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-white'">
          <h3 class="font-semibold text-blue-500 text-lg">
            {{ task.title }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ task.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "career", // Default active tab
      selectedYear: "Year 1", // Default selected year
      years: ["Year 1", "Year 2", "Year 3", "Year 4"],
      tasks: {
        "Year 1": [
          {
            title: "Meet with Academic Advisor",
            description: "Schedule and attend at least 2 meetings with your academic advisor to discuss your academic plan and progress.",
            completed: true,
          },
          {
            title: "Join Clubs/Organizations",
            description: "Join at least 2 student clubs or organizations related to your interests or major.",
            completed: false,
          },
          {
            title: "Attend Workshops",
            description: "Participate in at least 3 skill-building or academic workshops offered by the university.",
            completed: false,
          },
          {
            title: "Network with Peers",
            description: "Make an effort to meet and build connections with at least 10 new classmates or peers.",
            completed: false,
          },
          {
            title: "Maintain GPA",
            description: "Aim to achieve and maintain a GPA of 3.0 or higher.",
            completed: false,
          },
        ],
        "Year 2": [
          {
            title: "Plan for Internships",
            description: "Start looking for internships that align with your career goals.",
            completed: false,
          },
        ],
        "Year 3": [],
        "Year 4": [],
      },
      semesters: ["Semester 1"],
    };
  },
  methods: {
    selectSemester(semester) {
      alert(`Selected ${semester}`);
    },
    addSemester() {
      const newSemester = `Semester ${this.semesters.length + 1}`;
      this.semesters.push(newSemester);
    },
  },
};
</script>

<style scoped>
/* TailwindCSS will handle all styling. */
</style>
