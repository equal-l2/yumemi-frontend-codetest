<script setup lang="ts">
import { defineEmits, ref, toRefs } from "vue";
import { PrefInfo, LoadingState } from "../types";

defineEmits<{ (e: "change", idSelected: number[]): void }>();

type Props = {
  prefInfos: PrefInfo[];
  state: LoadingState;
};

const props = defineProps<Props>();

const { prefInfos: prefs, state } = toRefs(props);

// for onChange event
const idSelected = ref<number[]>([]);
</script>

<template>
  <div v-if="state === 'LOADING'">都道府県名をロード中</div>
  <div v-else-if="state === 'SUCCESS'">
    <p v-if="prefs.length === 0">都道府県名データが存在しません</p>
    <label v-for="item in prefs" v-else :key="item.prefCode">
      <input
        v-model="idSelected"
        type="checkbox"
        :value="item.prefCode"
        @change="$emit('change', idSelected)"
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
