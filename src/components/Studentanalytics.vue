<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Student Profile Analytics</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2">Performance Overview</h2>
        <canvas id="performanceChart"></canvas>
      </div>
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold mb-2">Attendance Record</h2>
        <canvas id="attendanceChart"></canvas>
      </div>
    </div>
    <div class="bg-white shadow-md rounded-lg p-4 mt-6">
      <h2 class="text-xl font-semibold mb-2">Recent Activities</h2>
      <ul>
        <li class="border-b py-2">Completed Math Assignment</li>
        <li class="border-b py-2">Attended Science Class</li>
        <li class="border-b py-2">Participated in Sports Day</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

export default {
  name: "StudentProfileAnalytics",
  mounted() {
    this.renderPerformanceChart();
    this.renderAttendanceChart();
  },
  methods: {
    renderPerformanceChart() {
      const ctx = document.getElementById("performanceChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Math", "Science", "English", "History"],
          datasets: [
            {
              label: "Scores",
              data: [85, 90, 78, 88],
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    renderAttendanceChart() {
      const ctx = document.getElementById("attendanceChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "Attendance",
              data: [100, 90, 80, 95],
              fill: false,
              borderColor: "rgba(255, 99, 132,  1)",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
  },
};
</script>
