<script setup lang="ts">
import ky from "ky";
import { onMounted, ref } from "vue";
const prefectures = ref<{ prefCode: number; prefName: string }[]>([]);
const loading = ref(true);
const hasError = ref(false);
onMounted(async () => {
  try {
    const resp = await ky("/api/prefectures");
    const json = await resp.json();
    console.log(json);
    prefectures.value = json.result;
  } catch (e) {
    console.log("Error:", e);
    hasError.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else-if="hasError">Error!</div>
  <div v-else>
    <ul>
      <li v-for="item in prefectures" :key="item.prefCode">
        {{ item.prefCode }} : {{ item.prefName }}
      </li>
    </ul>
  </div>
</template>

<style></style>
