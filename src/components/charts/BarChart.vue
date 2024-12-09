<template>
  <div class="card h-[400px]">
    <h3 class="text-gray-500 text-sm font-medium mb-4">User Demographics</h3>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = {
  labels: ["18-24", "25-34", "35-44", "45-54", "55-64", "65+"],
  datasets: [
    {
      label: "Age Distribution",
      data: [65, 120, 95, 75, 45, 25],
      backgroundColor: [
        "#4F46E5",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#EC4899",
      ],
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
