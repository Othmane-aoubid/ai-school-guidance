<template>
  <div class="card h-[400px]">
    <h3 class="text-gray-500 text-sm font-medium mb-4">
      Platform Metrics Comparison
    </h3>
    <Radar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Radar } from "vue-chartjs";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const chartData = {
  labels: [
    "UI/UX",
    "Performance",
    "Features",
    "Support",
    "Documentation",
    "Reliability",
  ],
  datasets: [
    {
      label: "Current Month",
      data: [85, 90, 75, 80, 70, 95],
      backgroundColor: "rgba(79, 70, 229, 0.2)",
      borderColor: "#4F46E5",
      pointBackgroundColor: "#4F46E5",
    },
    {
      label: "Previous Month",
      data: [80, 85, 70, 75, 65, 90],
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "#10B981",
      pointBackgroundColor: "#10B981",
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
    r: {
      min: 0,
      max: 100,
      beginAtZero: true,
    },
  },
};
</script>
