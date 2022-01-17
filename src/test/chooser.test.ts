import { mount } from "@vue/test-utils";
import PrefChooser from "../components/PrefChooser.vue";
import { test, expect } from "vitest";
import { sleep } from "./utils";

// prefInfosが空の場合
test("on empty info", async () => {
  const props = {
    prefInfos: [],
    loading: true,
    disabled: false,
  };
  const wrapper = mount(PrefChooser, { props: props });

  // ロード中メッセージ表示
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);

  // ロード中表示が消えるか
  props.loading = false;
  await wrapper.setProps(props);
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);

  // 項目がない旨のメッセージが出る
  expect(wrapper.find('[data-test="no-item"]').exists()).toBe(true);

  // 再びロード中メッセージ表示されるか
  props.loading = true;
  await wrapper.setProps(props);
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
});

// 通常
test("normal behavior", async () => {
  const props = {
    prefInfos: [
      { prefName: "Alpha", prefCode: 0 },
      { prefName: "Bravo", prefCode: 1 },
      { prefName: "Charlie", prefCode: 2 },
    ],
    loading: true,
    disabled: false,
  };
  const wrapper = mount(PrefChooser, { props: props });

  // ロード中メッセージ表示
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);

  // ロード中表示が消えるか
  props.loading = false;
  await wrapper.setProps(props);
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(false);

  // 各チェックボックスのテスト
  for (const item of props.prefInfos) {
    // チェックボックスを内包するラベルが存在するか
    const label = wrapper.find(`[data-test="input${item.prefCode}"]`);
    expect(label.exists()).toBe(true);

    // ラベルに都道府県名が出ているか
    expect(label.text()).toEqual(item.prefName);

    // チェックボックスが存在するか
    const checkbox = wrapper.find(
      `[data-test="input${item.prefCode}"] > input`
    );
    expect(checkbox.exists()).toBe(true);

    // チェックボックスをオンにする
    await checkbox.setValue(true);
  }

  // debounce待ち
  await sleep(1100);

  // 'change'イベントが一回投げられ、中身は各チェックボックスに対応するコードのはず
  expect(wrapper.emitted()).toHaveProperty("change"); // changeが起きたか
  expect(wrapper.emitted().change).toHaveLength(1); // changeは1回のみ
  expect(wrapper.emitted().change[0]).toEqual([
    props.prefInfos.map((i) => i.prefCode),
  ]); // 中身チェック

  // 再びロード中メッセージ表示されるか
  props.loading = true;
  await wrapper.setProps(props);
  expect(wrapper.find('[data-test="loading"]').exists()).toBe(true);
});
