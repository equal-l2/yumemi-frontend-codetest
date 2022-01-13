<script setup lang="ts">
import ky from "ky";
import { onMounted, ref } from "vue";
const prefectures = ref<{ prefCode: number; prefName: string }[]>([]);
onMounted(async () => {
  const resp = await ky.get("/api/prefectures");
  const json = await resp.json();
  prefectures.value = json.result;
  console.log(json.result);
});
</script>

<template>
  <ul>
    <li v-for="item in prefectures" :key="item.prefCode">
      {{ item.prefCode }} : {{ item.prefName }}
    </li>
  </ul>
</template>

<style></style>
