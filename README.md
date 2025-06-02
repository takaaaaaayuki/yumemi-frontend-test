# yumemi-frontend-test

Yumemiフロントエンドコーディング試験の課題実装用リポジトリ。

---

## 概要

本アプリは都道府県別の人口推移を表示するシングルページアプリケーション（SPA）です。  
以下のような機能を実装しています。

- 都道府県一覧をAPIから取得し、チェックボックスで選択可能
- 選択した都道府県の人口推移（総人口、年少人口、生産年齢人口、老年人口）を折れ線グラフで表示
- 人口区分の切り替えUIを搭載
- 選択中の都道府県数、表示期間、人口区分などを整理して表示
- 各都道府県の人口データ取得状況をスピナーで表示
- レスポンシブデザインで、モバイル・PC両対応

---

## 使用技術

- **React (TypeScript)**: UI構築
- **Recharts**: 折れ線グラフ描画
- **ESLint / Prettier**: コード品質管理
- **Jest / React Testing Library**: ユニットテスト
- **Vercel**: デプロイ環境

---

## セットアップ

```bash
git clone https://github.com/takaaaaaayuki/yumemi-frontend-test
cd yumemi-frontend-test
npm install
npm start
````

---

## テスト

```bash
npm test
```

JestとReact Testing Libraryを使用し、主要なコンポーネントの初期表示・イベントのテストを実装しています。

---

## デプロイURL

[https://yumemi-frontend-test-eosin.vercel.app/](https://yumemi-frontend-test-eosin.vercel.app/)

---

## 機能詳細

✅ **都道府県チェックボックス**

* APIから都道府県一覧を取得し、動的にチェックボックスを生成
* チェックすると、その都道府県の人口構成データを取得してグラフに反映
* チェックを外すと、該当データを除外

✅ **全選択 / 全解除ボタン**

* ワンクリックで全都道府県を一括選択・解除可能

✅ **地方ごとの一括選択**

* 「九州」など地方単位で都道府県をまとめて選択可能
* 地方ボタンを押すと、該当地域の都道府県を一括で選択・グラフに反映

✅ **人口区分の切り替え**

* 「総人口」「年少人口」「生産年齢人口」「老年人口」をセレクトボックスで切り替え可能

✅ **グラフ表示**

* 選択した都道府県のデータをRechartsで折れ線グラフに表示
* グラフの凡例・ツールチップのカスタマイズにより視認性向上

✅ **レスポンシブデザイン**

* モバイル（幅768px未満）/PCのレイアウト最適化
* フレックスレイアウトの動的切り替え

✅ **スピナー表示**

* API取得中にスピナーを表示し、ユーザー操作感を向上

✅ **開発品質の担保**

* ESLint / Prettier設定済み
* TypeScriptによる型安全な実装

---

## 工夫ポイント

* **地方ごとの一括選択**:

  * 「九州」など地域単位での一括選択機能を実装し、操作性向上
* **API取得状況のスピナー表示**:

  * データ取得時に都道府県ごとにスピナーを表示し、処理中が一目瞭然
* **視認性向上のUI設計**:

  * カラーハイライト、カードUI、余白設計などを調整し、わかりやすく
* **レスポンシブデザイン**:

  * モバイル/PC両方の利用シーンを考慮
* **テストコードの実装**:

  * 主要コンポーネントのテストを追加し、品質担保
* **ESLint / Prettier整備**:

  * 開発フローでのLint・フォーマットを自動化し、コード品質を一貫管理

---

## 取り組み時間と履歴

* **取り組み時間**: 約12時間
* **プログラミング歴**: 2年
* **WEBフロントエンド経験**: 半年
* **AIツール利用**: ChatGPTをコーディングサポート・文章ブラッシュアップに活用

---

## 参考にしたページや書籍・リポジトリ

* [React公式ドキュメント](https://react.dev/)
* [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
* [Recharts公式ドキュメント](https://recharts.org/en-US)
* [ゆめみAPI仕様書](https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc)
* [MDN Web Docs](https://developer.mozilla.org/ja/)
* [Qiita: Reactのテスト入門](https://qiita.com/yuta-ike/items/ce7b3e1913889dddf41a)
* [Zenn: React Testing Libraryでテストを書く](https://zenn.dev/uttk/articles/79c92f2f1d2b94)
* **ChatGPT**（コーディングサポート・文章ブラッシュアップ）

---

## 今後の改善ポイント（例）

* ✅ グラフのカスタマイズ性向上（例: カラースキーム切り替え）
* ✅ 選択状態のローカル保存（LocalStorageなど）
* ✅ グラフのダウンロード機能
* ✅ UIフレームワーク（Tailwind CSSなど）導入によるスタイル統一

---

以上、アプリ全体の概要・機能・工夫・技術スタックを網羅しました。



