# 大宮国際中等教育学校周辺バス停 接近表示モニター

大宮国際中等教育学校の周辺バス停（大宮国際中等教育学校・三橋四丁目）に接近する西武バスのリアルタイム位置・遅延情報を表示するウェブアプリケーションです。電光掲示板（バスロケ）風のUIで、次のバスの到着予定時刻や運行告知を直感的に確認できます。

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 主な機能

* **リアルタイム位置・遅延情報の表示**
  * 公共交通オープンデータセンターのAPIを活用し、各バスの現在地・到着予定分数・遅延時間をリアルタイム更新（30秒自動更新）。
* **柔軟な行き先フィルタリング**
  * 「大宮駅西口」「さいたま新都心駅」「その他」での絞り込みが可能。
* **まもなく到着するバスの強調表示（接近モード）**
  * 到着まで3分以内のバスを最上部にハイライト表示。
* **お知らせテロップ表示（スプレッドシート連携）**
  * Google Apps Script (GAS) 経由でGoogleスプレッドシートから最新の告知・注意事項を取得し、画面下部の電光掲示板風テロップに自動流し込み（キャッシュ管理機能付き）。

---

## 使用技術

* **フロントエンド:** HTML5 / CSS3 / JavaScript (Vanilla JS)
* **バックエンド / API:** 
  * Cloudflare Workers（バスGTFS-RTデータ取得・キャッシュ・整形プロキシ）
  * Google Apps Script / Google Sheets API（お知らせテロップ配信エンドポイント）
* **CI/CD:** GitHub Actions（GitHub Secretsを使用した環境変数置換＆GitHub Pages自動デプロイ）
* **データソース:** [公共交通オープンデータセンター](https://www.odpt.org/) (西武バス GTFS-RTデータ)

---

## デプロイ・開発手順
 ### 独自環境で実行する場合
* html内のYOUR_SERVER_URLを交通データを取得しているサーバーのURLに変更してください
* html内のYOUR_GAS_URLを、Google Apps Script のウェブアプリURLに変更してください。
 
 ### GitHub Pagesで実行する場合
 1. **GitHub Secrets の設定**
   リポジトリの `Settings > Secrets and variables > Actions` に以下を登録します。
   * `WORKER_URL`: Cloudflare Worker のエンドポイントURL
   * `GAS_URL`: Google Apps Script のウェブアプリURL (`https://script.google.com/macros/s/.../exec`)
 2. **自動デプロイ**
   `main` ブランチにコードを Push すると、GitHub Actions が HTML 内のプレースホルダーを置換し、GitHub Pages へ自動デプロイされます。

---

## ライセンス・クレジット

### ライセンス
* 本プロジェクトのソースコードは MIT License のもとで公開されています。
* 自作発言や、作者（クレジット）を偽った再配布はご遠慮ください。
* 変更を加えずそのまま再配布するのではなく、本リポジトリへのリンク（シェア）をご利用いただけると幸いです。

### データに関する注意事項
* 本サービスが利用するリアルタイムデータは、公共交通オープンデータセンターにおいて提供されるものです。
* 西武バス株式会社から提供されたデータを元にしていますが、必ずしも正確・完全なものとは限りません。
* 本サービスについて、西武バス株式会社様へ直接のお問い合わせをする行為はご遠慮ください。

### 作者 / お問い合わせ
* 制作: 水野・明司（hirokiti17）
* バグ報告・ご意見等: [GitHub Issues](https://github.com/hirokiti17/buspro-m/issues) または [Googleフォーム](https://forms.gle/GcQiamJH3czniuY58)
