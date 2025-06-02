# yumemi-frontend-test

Yumemiフロントエンドコーディング試験の課題実装用リポジトリ。

## 概要

都道府県別の総人口推移を表示するSPAです。  
複数の都道府県を選択し、各都道府県の人口推移を折れ線グラフで比較表示します。  
「総人口」「年少人口」「生産年齢人口」「老年人口」の切り替えが可能です。

## 使用技術

- React (TypeScript)
- Recharts
- ESLint
- Prettier
- Jest
- React Testing Library
- Vercel (デプロイ先)

## セットアップ

```bash
git clone https://github.com/ユーザー名/yumemi-frontend-test.git
cd yumemi-frontend-test
npm install
npm start
````

## テスト

```bash
npm test
```

JestとReact Testing Libraryを使用。
主要なコンポーネントの初期表示やイベントのテストを実装しています。

## デプロイURL

[https://yumemi-frontend-test-gujofur3k-takayukis-projects-82c509f8.vercel.app]

## 工夫ポイント

* モバイル・PC両対応のレスポンシブデザイン
* 選択中の都道府県数、表示期間、人口区分などの表示情報整理
* ESLint / Prettierを設定し、開発中のコード品質管理を自動化
* API取得状況に応じてスピナーを表示し、ユーザー操作感を向上
* グラフの凡例・ツールチップのカスタマイズで視認性を向上

## 取り組み時間と履歴

* 取り組み時間: 12時間
* これまでのプログラミング歴: 2年
* これまでのWEBフロントエンド経験: 半年
* AIツール利用: ChatGPTをコーディングサポート・文章ブラッシュアップに活用

