it("run successfully", () => {
  // ページのロード
  cy.intercept("/").as("init");
  cy.visit("/");
  cy.wait("@init");

  // チェックボックスからランダムにいくつかをクリック
  const boxToPress = 5; // クリックする数
  const prefNames = []; // 都道府県名
  cy.intercept("/api/**").as("api");
  cy.get("label")
    .then(($l) => {
      const arr_all = $l.toArray(); // 全てのlabel要素
      const arr = Cypress._.sampleSize(arr_all, boxToPress); // 指定個数をランダム抽出
      return arr.map((i) => {
        const $i = Cypress.$(i);
        prefNames.push($i.text().trim()); // 要素から都道府県名を抽出
        return $i.find("input")[0]; // label要素直下のinputを抽出
      });
    })
    .click({ multiple: true });
  for (let i = 0; i < boxToPress; i++) {
    cy.wait("@api"); // APIアクセスが終了するまで待つ
  }

  // 処理が全て期待通りになっていれば
  // EChartsの凡例に各都道府県の名前が出ているはず
  cy.get("svg").should(($p) => {
    for (const name of prefNames) {
      expect($p).to.contain(name);
    }
  });
});
