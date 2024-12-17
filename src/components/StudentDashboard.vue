<template>
  <div>
    <h2 class="text-3xl font-semibold mb-6 mt-3">
      Welcome back, {{ studentName }}!
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Career Progress Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Career Progress</h3>
        <div class="relative pt-1">
          <div class="flex mb-2 items-center justify-between">
            <div>
              <span
                class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200"
              >
                Progress
              </span>
            </div>
            <div class="text-right">
              <span class="text-xs font-semibold inline-block text-blue-600">
                {{ progressPercentage }}%
              </span>
            </div>
          </div>
          <div
            class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200"
          >
            <div
              :style="{ width: progressPercentage + '%' }"
              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
        <p class="text-sm text-gray-600">
          Keep going! You're making great progress in your career exploration.
        </p>
      </div>

      <!-- Recommended Careers Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Recommended Careers</h3>
        <ul class="space-y-2">
          <li
            v-for="career in recommendedCareers"
            :key="career.title"
            class="flex items-center"
          >
            <i :class="career.icon + ' text-blue-500 mr-2'"></i>
            <span>{{ career.title }}</span>
          </li>
        </ul>
        <button class="mt-4 text-blue-600 hover:underline">
          Explore more careers
        </button>
      </div>

      <!-- Upcoming Tasks Widget -->
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold mb-4">Upcoming Tasks</h3>
        <ul class="space-y-2">
          <li
            v-for="task in upcomingTasks"
            :key="task.title"
            class="flex items-center justify-between"
          >
            <span>{{ task.title }}</span>
            <span class="text-sm text-gray-500">{{ task.dueDate }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Skills Chart -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Your Skills</h3>
      <canvas ref="skillsChart"></canvas>
    </div>

    <!-- Recent Activities -->
    <div class="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 class="text-xl font-semibold mb-4">Recent Activities</h3>
      <ul class="space-y-4">
        <li
          v-for="activity in recentActivities"
          :key="activity.title"
          class="flex items-start"
        >
          <i :class="activity.icon + ' mt-1 mr-2'"></i>
          <div>
            <p class="font-medium">{{ activity.title }}</p>
            <p class="text-sm text-gray-600">{{ activity.date }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  name: "StudentDashboard",
  data() {
    return {
      studentName: "Sarah",
      progressPercentage: 75,
      recommendedCareers: [
        { title: "Software Developer", icon: "fas fa-laptop-code" },
        { title: "Data Analyst", icon: "fas fa-chart-line" },
        { title: "UX Designer", icon: "fas fa-paint-brush" },
      ],
      upcomingTasks: [
        { title: "Complete Career Quiz", dueDate: "Due in 2 days" },
        { title: "Update Resume", dueDate: "Due in 5 days" },
        { title: "Research Internships", dueDate: "Due in 1 week" },
      ],
      recentActivities: [
        {
          title: "Completed Python Basics Course",
          date: "2 days ago",
          icon: "fas fa-check-circle text-green-500",
        },
        {
          title: "Started Web Development Tutorial",
          date: "5 days ago",
          icon: "fas fa-book text-blue-500",
        },
        {
          title: "Joined Computer Science Study Group",
          date: "1 week ago",
          icon: "fas fa-users text-purple-500",
        },
      ],
      skillsChart: null,
    };
  },
  methods: {
    initializeChart() {
      const ctx = this.skillsChart.getContext("2d");
      new Chart(ctx, {
        type: "radar",
        data: {
          labels: [
            "Problem Solving",
            "Creativity",
            "Communication",
            "Technical Skills",
            "Teamwork",
          ],
          datasets: [
            {
              label: "Your Skills",
              data: [80, 70, 65, 85, 75],
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "rgba(59, 130, 246, 1)",
              pointBackgroundColor: "rgba(59, 130, 246, 1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(59, 130, 246, 1)",
            },
          ],
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: false,
              },
              suggestedMin: 0,
              suggestedMax: 100,
            },
          },
        },
      });
    },
  },
  mounted() {
    this.initializeChart(); // Initialize chart when component is mounted
  },
};
</script>

