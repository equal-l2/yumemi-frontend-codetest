<script setup lang="ts">
import Chart from "chart.js/auto";
import { onMounted, watch, toRefs } from "vue";
import { LineData, LoadingStatus } from "../types";

type Props = {
  linesData: LineData[];
  loadStatus: LoadingStatus;
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

onMounted(() => {
  renderChart();
});

watch(lines, async () => {
  if (lines.value.length !== 0) {
    renderChart(lines.value);
  } else {
    renderChart();
  }
});
</script>

<template>
  <div id="chart-container">
    <canvas id="chart-canvas"></canvas>
    <div v-if="loadStatus === 'LOADING'" id="load-overlay">
      <span id="load-text">ロード中</span>
    </div>
  </div>
</template>

<style>
#chart-container {
  position: relative;
}
#load-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #000000a0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1em;
}
#load-text {
  color: white;
  font-size: 10vw;
}
</style>
