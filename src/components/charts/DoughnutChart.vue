<template>
  <div class="card h-[400px]">
    <h3 class="text-gray-500 text-sm font-medium mb-4">
      Satisfaction Distribution
    </h3>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: [
    "Very Satisfied",
    "Satisfied",
    "Neutral",
    "Dissatisfied",
    "Very Dissatisfied",
  ],
  datasets: [
    {
      data: [45, 30, 15, 7, 3],
      backgroundColor: ["#10B981", "#4F46E5", "#F59E0B", "#FB923C", "#EF4444"],
    },
  ],
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "right",
    },
  },
};
</script>
