<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, watch, toRefs } from "vue";
import { LineData } from "../types";

type Props = {
  linesData: LineData[];
};

const props = defineProps<Props>();
const { linesData: lines } = toRefs(props);

let chart: Chart | null = null;

const renderChart = (arr: { data: { x: number; y: number }[] }[] = []) => {
  if (!chart) {
    chart = new Chart("chart-canvas", {
      type: "scatter",
      data: {
        datasets: [],
      },
      options: {
        showLine: true,
        scales: {
          x: {
            min: 1955,
            max: 2050,
          },
          y: {
            min: 0,
          },
        },
      },
    });
  }
  chart.data.datasets = arr;
  chart.update();
};

onMounted(renderChart);

watch(lines, async () => {
  if (lines.value.length !== 0) {
    renderChart(lines.value);
  } else {
    renderChart();
  }
});
</script>

<template>
  <canvas id="chart-canvas"></canvas>
</template>

<style></style>
