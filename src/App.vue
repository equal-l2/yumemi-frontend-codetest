<script setup lang="ts">
import PopChart from "./components/PopChart.vue";
import PrefChooser from "./components/PrefChooser.vue";
import { ref } from "vue";

const ids = ref<number[]>([]);
</script>

<template>
  <PrefChooser @change="ids = $event" />
  <PopChart :ids="ids" />
</template>

<style></style>
