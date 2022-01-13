<script lang="ts">
import ky from "ky";
export default {
  data() {
    return {
      prefectures: {},
    };
  },
  async mounted() {
    const resp = await ky.get("/api/prefectures");
    const json = await resp.json();
    this.prefectures = json.result;
  },
};
</script>

<template>
  <ul>
    <li v-for="item in prefectures" :key="item.prefCode">
      {{ item.prefCode }} : {{ item.prefName }}
    </li>
  </ul>
</template>

<style></style>
