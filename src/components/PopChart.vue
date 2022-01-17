<script setup lang="ts">
import { watch, toRefs, ref } from "vue";
import { LineData } from "../types";
import { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import {
  TitleComponent,
  GridComponent,
  LegendComponent,
} from "echarts/components";
import VChart from "vue-echarts";

type Props = {
  linesData: LineData[]; // グラフ用のデータ
  loading: boolean; // 人口がロード中かどうか
};

const props = defineProps<Props>();
const { linesData: lines } = toRefs(props);

// EChartsの設定
const option = ref<EChartsOption>({
  xAxis: {
    min: 1950,
    max: 2050,
    interval: 20,
    name: "年度",
  },
  yAxis: {
    name: "人口",
  },
  legend: {},
  series: [],
});
use([SVGRenderer, TitleComponent, LineChart, GridComponent, LegendComponent]);

// propsからEChartsへデータを渡す
watch(lines, () => {
  // @ts-ignore LineData.typesの型がうまく合わない
  option.value.series = lines.value;
});
</script>

<template>
  <v-chart id="chart" :option="option" :loading="loading" autoresize />
</template>

<style></style>
