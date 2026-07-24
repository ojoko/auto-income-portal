# ⚡ OmniTools Hub - 0円自動収益化 ポータルサイト

会員登録不要・完全無料で使えるWeb便利ツール＆SEO最適化ポータルサイトです。  
サーバー維持費 **完全0円**（GitHub + Vercel / GitHub Pages）で全世界に公開でき、アクセス数とアフィリエイト/広告枠によって持持的に収益を育てる設計になっています。

---

## 🚀 主な機能
1. **🌐 SEO & OGP メタタグ作成 ＆ リアルタイムプレビュー**
   - Google検索結果および X (Twitter) カード表示をリアルタイムプレビュー。生成HTMLコードを即時コピー。
2. **📱 高画質 QRコード作成**
   - URL/テキストから即時生成＆画像ダウンロード。
3. **📝 テキスト整形 ＆ JSONバリデータ**
   - 文字数・行数・UTF-8バイト数高精度カウント、JSON整列/圧縮、大文字/小文字変換。
4. **🔐 暗号強度 パスワード自動生成**
   - `window.crypto` API を使用した安全な乱数生成と強度インジケーター。
5. **💰 収益化（広告＆アフィリエイト）**
   - ヘッダー/サイドバー/ツール直下の最適広告枠プレースホルダー
   - 開発者・Web制作者向けアフィリエイトカード枠
   - "Buy Me a Coffee" 等のサポートモーダル

---

## 📦 バックアップ ＆ 完全無料公開の手順

### ステップ 1: ローカルGitリポジトリの初期化
ターミナル（またはコマンドプロンプト）でこのディレクトリを開き、以下を実行します：

```bash
git init
git add .
git commit -m "Initial commit: OmniTools Hub Portal"
```

### ステップ 2: GitHubへバックアップ（無料）
1. [GitHub](https://github.com/) にログインし、新規リポジトリ（例: `omnitools-hub`）をパブリック作成します。
2. 以下のコマンドを実行してコードを押し上げます（バックアップ完了）：

```bash
git remote add origin https://github.com/YOUR_USERNAME/omnitools-hub.git
git branch -M main
git push -u origin main
```

### ステップ 3: Vercel または GitHub Pages で無料公開（所要時間: 1分）

#### A. Vercel（おすすめ・爆速・商用利用可能）
1. [Vercel](https://vercel.com/) にGitHubアカウントでログイン。
2. 「Add New...」 -> 「Project」をクリックし、先ほどの `omnitools-hub` リポジトリを選択。
3. 「Deploy」をクリックするだけで、数十秒後に `https://omnitools-hub.vercel.app` などのURLで世界中に公開されます！

#### B. GitHub Pages
1. GitHubのリポジトリページで **Settings** -> **Pages** を開く。
2. **Source** を `Deploy from a branch` に設定し、`main` ブランチを選択して保存。
3. 数分後、`https://YOUR_USERNAME.github.io/omnitools-hub/` で無料公開されます。

---

## 💵 収益化・広告枠の差し替え方法

1. **Google AdSense の広告タグ挿入**
   - `index.html` 内の `<div class="ad-slot" data-ad-slot="...">` の中に、取得した AdSense の `<script>` タグを貼り付けます。
2. **アフィリエイトリンクの変更**
   - `index.html` 内の `.aff-link` の `href` 属性（`https://a8.net` 等）を、ご自身のアフィリエイト提携リンクに書き換えます。
3. **サポート・投げ銭URLの変更**
   - `index.html` 内の `#supportModal` にある Buy Me a Coffee や Amazonほしい物リストのURLをご自身のものに変更します。

---

## 📄 ライセンス
MIT License
