<script setup lang="ts">
import ky from "ky";
import { defineEmits, onMounted, ref } from "vue";

defineEmits<{ (e: "change", idSelected: number[]): void }>();

// for storing fetched data
const prefectures = ref<{ prefCode: number; prefName: string }[]>([]);

// for showing "loading..." div
const loading = ref(true);
const hasError = ref(false);

// for onChange event
const idSelected = ref<number[]>([]);

onMounted(async () => {
  try {
    const resp = await ky("/api/v1/prefectures");
    const json = await resp.json();
    prefectures.value = json.result;
  } catch (e) {
    console.error("Error:", e);
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
    <label v-for="item in prefectures" :key="item.prefCode">
      <input
        v-model="idSelected"
        type="checkbox"
        :value="item.prefCode"
        @change="$emit('change', idSelected)"
      />
      {{ item.prefName }}
    </label>
  </div>
</template>

<style>
label {
  display: inline-block;
  width: 6em;
}
</style>
