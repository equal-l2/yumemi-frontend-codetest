<script setup lang="ts">
import { ref } from "vue";
import { PrefInfo } from "../types";
import debounce from "lodash/debounce";

// チェックボックス変化時に、チェックボックスの内容をイベントとして投げる
const emit = defineEmits<{ (e: "change", codeSelected: number[]): void }>();
const codeSelected = ref<number[]>([]); // チェックボックスの内容が入る

type Props = {
  prefInfos: PrefInfo[]; // 都道府県名とコードの対応
  loading: boolean; // prefInfosがロード中かどうか
  disabled: boolean;
};

defineProps<Props>();

// チェックボックスの変更は一定時間変更がない場合のみemitする
const debounceChange = debounce(() => {
  emit("change", codeSelected.value);
}, 1000);
</script>

<template>
  <div v-if="loading">都道府県名をロード中</div>
  <div v-else>
    <p v-if="prefInfos.length === 0">都道府県名データが存在しません</p>
    <label v-for="item in prefInfos" v-else :key="item.prefCode">
      <input
        v-model="codeSelected"
        type="checkbox"
        :value="item.prefCode"
        :disabled="disabled"
        @change="debounceChange"
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
