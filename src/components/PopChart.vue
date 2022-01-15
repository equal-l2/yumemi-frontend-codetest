<script setup lang="ts">
import Chart from "chart.js/auto";
import ky from "ky";
import { onMounted, watch } from "vue";

const props = defineProps<{ ids: number[] }>();

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

watch(props, async () => {
  const lines = [];
  for (const id of props.ids) {
    try {
      const resp = await ky(
        `/api/v1/population/composition/perYear?prefCode=${id}`
      );
      const json = await resp.json();
      const data: { year: number; value: number }[] = json.result.data[0].data;

      const points = data.map((item) => {
        return { x: item.year, y: item.value };
      });

      lines.push({
        data: points,
      });
    } catch (e) {
      console.error(e);
    }
  }

  if (lines.length !== 0) {
    renderChart(lines);
  } else {
    renderChart([]);
  }
});
</script>

<template>
  <canvas id="chart-canvas"></canvas>
</template>

<style></style>
