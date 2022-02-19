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
  <div class="pref-chooser-container" data-test="chooser">
    <p v-if="loading" data-test="loading">都道府県名をロード中</p>
    <template v-else>
      <p v-if="prefInfos.length === 0" data-test="no-item">
        都道府県名データが存在しません
      </p>
      <label
        v-for="item in prefInfos"
        v-else
        :key="item.prefCode"
        :data-test="'input' + item.prefCode"
      >
        <input
          v-model="codeSelected"
          type="checkbox"
          :value="item.prefCode"
          :disabled="disabled"
          @change="debounceChange"
        />
        {{ item.prefName }}
      </label>
    </template>
  </div>
</template>

<style scoped>
.pref-chooser-container {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
}

label {
  width: 6em;
  margin-bottom: 0.3em;
  user-select: none;
}
</style>
