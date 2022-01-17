<script setup lang="ts">
import { watch, toRefs, ref } from "vue";
import { LineData } from "../types";
import { EChartsOption } from "echarts";
import { use } from "echarts/core";
import { SVGRenderer } from "echarts/renderers";
import { LineChart } from "echarts/charts";
import { GridComponent, LegendComponent } from "echarts/components";
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
    interval: 20, // 目盛は20年単位
    name: "年",
  },
  // @ts-ignore formatterの型不一致
  yAxis: {
    name: "人口(万人)",
    axisLabel: {
      // 人口を見やすくするため1万人単位に
      formatter: (value: number) => value / 10000,
    },
  },
  legend: {
    // 凡例が多い場合にはスクロールさせる
    type: "scroll",
  },
  series: [],
});
use([SVGRenderer, LineChart, GridComponent, LegendComponent]);

// propsからEChartsへデータを渡す
watch(lines, () => {
  // @ts-ignore LineData.typesの型不一致
  option.value.series = lines.value;
});
</script>

<template>
  <v-chart :option="option" :loading="loading" autoresize />
</template>
