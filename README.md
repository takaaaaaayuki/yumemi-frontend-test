# yumemi-frontend-test

Yumemiフロントエンドコーディング試験の課題実装用リポジトリ。

---

## 📝 概要

都道府県別の人口推移を表示するSPA（Single Page Application）です。  
以下の機能を備えています。

- ✅ 都道府県一覧をAPIから取得し、チェックボックスで動的に選択
- ✅ 選択した都道府県の人口推移（総人口・年少人口・生産年齢人口・老年人口）を折れ線グラフで表示
- ✅ 地方ごとの一括選択機能
- ✅ API取得状況に応じてスピナーで進捗を表示
- ✅ レスポンシブデザイン（PC・モバイル対応）

---

## ⚙️ 使用技術

- **React (TypeScript)**: UI構築
- **Recharts**: 折れ線グラフ描画
- **ESLint / Prettier**: コード品質管理
- **Jest / React Testing Library**: ユニットテスト
- **Vercel**: デプロイ環境

---

## 🚀 セットアップ

```bash
git clone https://github.com/takaaaaaayuki/yumemi-frontend-test
cd yumemi-frontend-test
npm install
npm start
````

---

## 🧪 テスト

```bash
npm test
```

JestとReact Testing Libraryを使用し、主要なコンポーネントの初期表示・イベントのテストを実装しています。

---

## 🌐 デプロイURL

[https://yumemi-frontend-test-eosin.vercel.app/](https://yumemi-frontend-test-eosin.vercel.app/)

---

## 🎨 デザインシステム

* **ガラスモーフィズム採用**: 透明感と立体感のあるモダンな質感
* **グラデーション背景**: 複数色の`linear-gradient`で奥行きを演出
* **カラー統一**: 青系を軸に、緑（取得済み）、オレンジ（警告）などの意味色で情報を整理
* **影とエレベーション**: 要素間の階層感を表現する柔らかい影

---

## 📱 レスポンシブ・アクセシビリティ

* **モバイル最適化**: 44px以上のタッチターゲット・可読性を確保
* **動的グリッド**: 画面幅に応じた2-6列表示
* **インタラクション設計**: ホバー・フォーカス・アクティブのフィードバックを実装

---

## ✨ UXマイクロインタラクション

* **選択時の視覚効果**: グラデーション背景・スケール拡大・影の強化
* **スムーズなローディング**: CSSアニメーションによるスピナー回転
* **統計カード**: 一目で選択状況がわかる数値表示

---

## 💡 インラインスタイル採用理由

* **依存最小化**: Tailwind CSSなどの設定不要で即座にスタイル適用
* **保守性向上**: スタイルとロジックを同一コンポーネントで管理
* **パフォーマンス**: ビルド時のCSS処理なしで開発・デプロイ高速化

---

## 📊 グラフ・データビジュアライゼーション

* **16色カラーパレット**: 視認性を意識した配色
* **線の差別化**: 実線・破線・点線で区別可能
* **カスタムツールチップ**: ガラスモーフィズム＆数値フォーマットで見やすさ向上
* **Y軸の単位**: 万人単位表示で日本の人口データに最適化

---

## 🧹 ミニマルデザイン哲学

* **不要な装飾排除**: 機能性を最優先
* **余白の活用**: 操作性と読みやすさを両立
* **一貫したコンポーネント設計**: ボタン・カード・入力UIに統一感

---

## 🕒 取り組み時間・履歴

* 取り組み時間: **約12時間**
* プログラミング歴: **約2年**
* WEBフロントエンド経験: **半年**
* AIツール利用: **ChatGPTで設計・コードブラッシュアップを支援**

---

## 🔗 参考にしたページや書籍・リポジトリ

* [React公式ドキュメント](https://react.dev/)
* [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
* [Recharts公式ドキュメント](https://recharts.org/en-US)
* [ゆめみAPI仕様書](https://yumemi-frontend-engineer-codecheck-api.vercel.app/api-doc)
* [MDN Web Docs](https://developer.mozilla.org/ja/)
* [Qiita: Reactのテスト入門](https://qiita.com/yuta-ike/items/ce7b3e1913889dddf41a)
* [Zenn: React Testing Libraryでテストを書く](https://zenn.dev/uttk/articles/79c92f2f1d2b94)
* **ChatGPT**（コーディングサポート・文章ブラッシュアップ）

---

## 🔮 今後の改善ポイント

* 地方ごとのまとめ選択機能
* グラフのカスタマイズ性向上（例: カラースキーム切り替え）
* ローカルストレージによる選択状態の保存
* グラフのエクスポート機能

---


