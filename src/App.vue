<script setup lang="ts">
import PopChart from "./components/PopChart.vue";
import PrefChooser from "./components/PrefChooser.vue";
import { ref, onMounted } from "vue";
import ky from "ky";
import { PrefInfo, Point, LineData } from "./types";

const prefs = ref<PrefInfo[]>([]);
const prefsLoading = ref(false);

// 都道府県名と都道府県コードを取得
const fetchPrefs = async () => {
  prefsLoading.value = true;
  try {
    const resp = await ky("/api/v1/prefectures");
    const json = await resp.json();
    prefs.value = json.result;
  } catch (e) {
    console.error("Error:", e);
  }
  prefsLoading.value = false;
};

const lines = ref<LineData[]>([]);
const linesLoading = ref(false);

// コードに対応した各都道府県の総人口推移を取得
const fetchPops = async (codes: number[]) => {
  linesLoading.value = true;
  const linesTmp = [];
  for (const code of codes) {
    const info = prefs.value.find((elem) => elem.prefCode === code);
    if (info) {
      try {
        const resp = await ky(
          `/api/v1/population/composition/perYear?prefCode=${code}`
        );
        const json = await resp.json();
        const data: { year: number; value: number }[] =
          json.result.data[0].data;

        const points: Point[] = data.map((item) => {
          return [item.year, item.value];
        });

        linesTmp.push({
          name: info.prefName,
          data: points,
          type: "line",
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  linesLoading.value = false;
  lines.value = linesTmp;
};

onMounted(fetchPrefs);
</script>

<template>
  <PrefChooser id="chooser"
    :pref-infos="prefs"
    :loading="prefsLoading"
    :disabled="linesLoading"
    @change="fetchPops"
  />
  <PopChart id="chart" :lines-data="lines" :loading="linesLoading" />
</template>

<style>
body {
  height:100%;
  overflow: hidden;
}
#chooser {
  height: 50vh;
  overflow-y: auto;
}
#chart {
  height: 50vh;
  width: 90vw;
  padding-left: auto;
  padding-right: auto;
  margin: 1em;
}
</style>
