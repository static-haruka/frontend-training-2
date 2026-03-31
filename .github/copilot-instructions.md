# Copilot 指示（このリポジトリ向け）

目的：このファイルは AI エージェントが素早く実装できるよう、このリポジトリ固有の構造・慣習・実例を短くまとめます。

- **プロジェクト種類**: Next.js (App Router) + TypeScript、TailwindCSS。React 19 / Next 16 を使用。
- **起動 / ビルド**: 開発は `npm run dev`、ビルドは `npm run build`、起動は `npm run start`。ポートはデフォルトで 3000。

- **主要ディレクトリ**:
  - `src/app/` — ルートレイアウトとページ（App Router）。例: `src/app/vpc/page.tsx` は VPC 管理画面。
  - `src/components/` — 再利用 UI（多くは `"use client"`）。例: `src/components/layout/Sidebar.tsx`、`Header.tsx`。
  - `src/lib/` — アプリ固有ユーティリティ & API クライアント。例: `src/lib/api/vpc.ts`。
  - `src/types/` — 共通型定義。例: `src/types/vpc.ts`。

- **重要な設計/実装パターン（必ず守る）**:
  - クライアントサイド状態は `"use client"` を付けたコンポーネントで管理。多くのページコンポーネントとモーダルはクライアントコンポーネント。
  - API 呼び出しは `src/lib/api/*` にまとめられている。例: `getStacks`, `createStack`, `updateStack`, `deleteStack`（`src/lib/api/vpc.ts`）。関数は `fetch` を直接使い、失敗時は `res.ok` をチェックしてエラーを投げる。
  - 型は `src/types` からインポートする（例: `VpcStack`）。新しい API を追加する際は型を `src/types` に追加。
  - ルーティングやナビは `src/lib/navItems.ts` で定義された配列を使用。サイドバーはこの配列を参照してレンダリングする。

- **実装のヒント（具体例）**:
  - VPC ページでの API 使用例: [src/app/vpc/page.tsx](src/app/vpc/page.tsx) は `getStacks()` を呼び、結果をローカル state に保存して表示・編集・削除している。新しいリソースも同様のパターンで実装する。
  - API クライアントはブラウザ側で実行されるため、認証やサーバーシークレットを直接埋め込まないこと。外部サービスやサーバー処理が必要なら `app/api` のエンドポイントを作成してプロキシする。
  - モーダルコンポーネント（例: `CreateModal`, `EditModal`）は親にコールバックを渡す設計 — サイドエフェクト（API 呼び出し）は親で行う。

- **コーディング規約・スタイル**:
  - JSX 内にインライン style が多用される（色やサイズ）。既存スタイルに合わせること。
  - 小さな UI コンポーネントは TypeScript の `Props` 型を明示する。
  - ファイルのパスはエイリアス `@/` を使う（例: `@/lib/api/vpc`）。

- **注意点 / 制約**:
  - 外部 API ベース URL は `src/lib/api/vpc.ts` にハードコード（開発用の mockapi）。本番差し替えが必要な場合は環境変数運用に変更すること。
  - Next 固有のサーバー機能（Server Components / server actions）は現在ほとんど使われていない。大きなデータハンドリングや認証は `app/api` を追加して行うのが安全。

- **よく見るファイル（参照推奨）**
  - VPC 実装: `src/app/vpc/page.tsx`
  - API クライアント: `src/lib/api/vpc.ts`
  - 型定義: `src/types/vpc.ts`
  - ナビ定義: `src/lib/navItems.ts`
  - レイアウト/UI: `src/components/layout/Sidebar.tsx`, `Header.tsx`, `TabBar.tsx`

もしこの要約で不足する部分（認証、環境変数、テストコマンド等）があれば教えてください。追記します。
