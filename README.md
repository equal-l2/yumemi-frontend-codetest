# ゆめみ フロントエンド課題 NEXT

## 目的

個人的な Vue におけるベストプラクティスの確立

## 前提環境

- Node が入っていること  
  (Node v17 では Vite と Netlify CLI の組み合わせで動作がうまくいかないため、nvm などで**v16 以下をインストール**すること)
- RESAS API に登録し、API キーを発行しておくこと

## セットアップ

1. `npm install`を実行し、パッケージ類をインストールする
2. `.env.sample`を`.env`にコピーしたうえで、RESAS API のキーを`.env`に記入する
3. `npm run start`を実行するとアプリケーションサーバが起動する

## テスト

- `npm run lint`: *eslint*によるリント(+自動修正)および*prettier*によるフォーマット
- `npm run typeck`: *vue-tsc*による型チェック
- `npm run test`: *vitest*による単体テスト
- `npm run cy:test`: *cypress*による結合テスト
