<template>
  <div class="card h-[400px]">
    <h3 class="text-gray-500 text-sm font-medium mb-4">Response Trends</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"],
  datasets: [
    {
      label: "Survey Responses",
      data: [150, 220, 180, 280, 250, 300],
      borderColor: "#4F46E5",
      tension: 0.4,
    },
    {
      label: "Completion Rate",
      data: [70, 75, 72, 80, 78, 85],
      borderColor: "#10B981",
      tension: 0.4,
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>
