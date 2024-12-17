<template>
  <div>
    <h2 class="text-3xl font-semibold mb-6">Welcome, {{ schoolName }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Student Engagement Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Student Engagement</h3>
        <div class="text-4xl font-bold text-blue-600 mb-2">
          {{ studentEngagement }}%
        </div>
        <p class="text-sm text-gray-600">
          of students actively using the platform this week
        </p>
      </div>

      <!-- Popular Career Paths Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Popular Career Paths</h3>
        <ul class="space-y-2">
          <li
            v-for="career in popularCareers"
            :key="career.title"
            class="flex items-center justify-between"
          >
            <span>{{ career.title }}</span>
            <span class="text-sm font-semibold text-blue-600"
              >{{ career.percentage }}%</span
            >
          </li>
        </ul>
      </div>

      <!-- Quick Actions Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Quick Actions</h3>
        <div class="space-y-2">
          <button
            v-for="action in quickActions"
            :key="action.title"
            class="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded transition duration-300"
          >
            {{ action.title }}
          </button>
        </div>
      </div>
    </div>

    <!-- Student Performance Chart -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Student Performance Overview</h3>
      <canvas ref="performanceChart"></canvas>
    </div>

    <!-- Recent Updates -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Recent Updates</h3>
      <ul class="space-y-4">
        <li
          v-for="update in recentUpdates"
          :key="update.title"
          class="flex items-start"
        >
          <i :class="update.icon + ' mt-1 mr-2'"></i>
          <div>
            <p class="font-medium">{{ update.title }}</p>
            <p class="text-sm text-gray-600">{{ update.description }}</p>
            <p class="text-xs text-gray-500">{{ update.date }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  name: "SchoolDashboard",
  data() {
    return {
      schoolName: "Evergreen High School",
      studentEngagement: 78,
      popularCareers: [
        { title: "Computer Science", percentage: 25 },
        { title: "Engineering", percentage: 20 },
        { title: "Healthcare", percentage: 18 },
        { title: "Business", percentage: 15 },
        { title: "Arts and Design", percentage: 12 },
      ],
      quickActions: [
        { title: "Schedule Career Fair" },
        { title: "Generate Performance Reports" },
        { title: "Update Curriculum Integration" },
        { title: "Manage Student Accounts" },
      ],
      recentUpdates: [
        {
          title: "New Career Exploration Module",
          description:
            "A new interactive module on emerging tech careers has been added to the platform.",
          date: "2 days ago",
          icon: "fas fa-plus-circle text-green-500",
        },
        {
          title: "Student Achievement Milestone",
          description:
            "500 students have completed their career assessment this month.",
          date: "1 week ago",
          icon: "fas fa-award text-yellow-500",
        },
        {
          title: "Upcoming Webinar",
          description:
            'Join us for a webinar on "Preparing Students for the Future of Work" next week.',
          date: "3 days ago",
          icon: "fas fa-video text-blue-500",
        },
      ],
      performanceChart: null,
    };
  },
  methods: {
    initializeChart() {
      const ctx = this.performanceChart.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Grade 9", "Grade 10", "Grade 11", "Grade 12"],
          datasets: [
            {
              label: "Career Readiness Score",
              data: [65, 70, 80, 85],
              backgroundColor: "rgba(59, 130, 246, 0.8)",
            },
            {
              label: "Platform Engagement",
              data: [70, 75, 85, 90],
              backgroundColor: "rgba(16, 185, 129, 0.8)",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: "Score / Engagement %",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Student Performance by Grade",
            },
          },
        },
      });
    },
  },
  mounted() {
    this.initializeChart();
  },
};
</script>

