<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { PrefInfo, LoadingStatus } from "../types";
import debounce from "lodash/debounce";

const emit = defineEmits<{ (e: "change", idSelected: number[]): void }>();

type Props = {
  prefInfos: PrefInfo[];
  loadStatus: LoadingStatus;
};

defineProps<Props>();

// for onChange event
const idSelected = ref<number[]>([]);

const debounceChange = debounce(() => {
  emit("change", idSelected.value);
}, 500);
</script>

<template>
  <div v-if="loadStatus === 'LOADING'">都道府県名をロード中</div>
  <div v-else-if="loadStatus === 'SUCCESS'">
    <p v-if="prefInfos.length === 0">都道府県名データが存在しません</p>
    <label v-for="item in prefInfos" v-else :key="item.prefCode">
      <input
        v-model="idSelected"
        type="checkbox"
        :value="item.prefCode"
        @change="debounceChange"
      />
      {{ item.prefName }}
    </label>
  </div>
  <div v-else>都道府県名のロードに失敗しました</div>
</template>

<style>
label {
  display: inline-block;
  width: 6em;
}
</style>
