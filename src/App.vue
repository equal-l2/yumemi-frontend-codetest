<script setup lang="ts">
import PopChart from "./components/PopChart.vue";
import PrefChooser from "./components/PrefChooser.vue";
import { ref, onMounted } from "vue";
import ky from "ky";
import { PrefInfo, Point, LineData, LoadingState } from "./types";

const prefs = ref<PrefInfo[]>([]);
const prefsLoadStatus = ref<LoadingState>("LOADING");

const fetchPrefs = async () => {
  try {
    const resp = await ky("/api/v1/prefectures");
    const json = await resp.json();
    prefs.value = json.result;
  } catch (e) {
    console.error("Error:", e);
    prefsLoadStatus.value = null;
    return;
  }
  prefsLoadStatus.value = "SUCCESS";
};

const lines = ref<LineData[]>([]);

const fetchPops = async (ids: number[]) => {
  const linesTmp = [];
  for (const id of ids) {
    const info = prefs.value.find((elem) => elem.prefCode === id);
    if (info) {
      try {
        const resp = await ky(
          `/api/v1/population/composition/perYear?prefCode=${id}`
        );
        const json = await resp.json();
        const data: { year: number; value: number }[] =
          json.result.data[0].data;

        const points: Point[] = data.map((item) => {
          return { x: item.year, y: item.value };
        });

        linesTmp.push({
          label: info.prefName,
          data: points,
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
  lines.value = linesTmp;
};

onMounted(fetchPrefs);
</script>

<template>
  <PrefChooser
    :pref-infos="prefs"
    :state="prefsLoadStatus"
    @change="fetchPops"
  />
  <PopChart :lines-data="lines" />
</template>

<style></style>
