"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import OrgTree from "@/components/users/OrgTree";
import { orgTree, mockUsers } from "@/lib/mockUsers";

export default function UsersPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>("a-honsha");

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      <Header sidebarWidth={sidebarWidth} />
      <TabBar sidebarWidth={sidebarWidth} />
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />

      <main
        className="transition-all duration-200"
        style={{
          marginTop: "58px",
          marginLeft: `${sidebarWidth}px`,
          minHeight: "calc(100vh - 58px)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              ユーザー管理
            </h1>
            <button
              className="flex items-center gap-1 px-3 py-1 rounded text-sm"
              style={{ color: "#4a90d9", border: "1px solid #4a90d9" }}
            >
              在籍中のユーザー
              <span style={{ fontSize: "10px" }}>▼</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ☰ 表示項目
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ▽ フィルター
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ↑ ソート
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-end gap-2 px-6 py-2"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <span className="text-sm" style={{ color: "#4a5568" }}>
            日付を指定して過去のユーザー情報を表示
          </span>
          <button
            className="px-2 py-1 rounded text-sm"
            style={{
              border: "1px solid #cbd5e0",
              color: "#4a5568",
              backgroundColor: "#ffffff",
            }}
          >
            📅
          </button>
          <button
            className="px-3 py-1 rounded text-sm"
            style={{
              border: "1px solid #cbd5e0",
              color: "#4a5568",
              backgroundColor: "#ffffff",
            }}
          >
            指定
          </button>
        </div>

        <div
          className="flex"
          style={{ height: "calc(100vh - 58px - 60px - 44px)" }}
        >
          <div
            style={{
              width: "280px",
              flexShrink: 0,
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              overflowY: "auto",
            }}
          >
            <OrgTree
              nodes={orgTree}
              selectedId={selectedOrgId}
              onSelect={setSelectedOrgId}
            />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
              }}
            >
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#2d3748" }}
                >
                  社員{" "}
                  <span style={{ color: "#4a90d9" }}>{mockUsers.length}</span>
                </span>
                <div className="text-xs mt-0.5" style={{ color: "#a0aec0" }}>
                  Aテスト本社
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="連絡先・ユーザーを検索"
                  className="px-3 py-1.5 text-sm rounded outline-none"
                  style={{
                    border: "1px solid #cbd5e0",
                    width: "220px",
                    color: "#2d3748",
                  }}
                />
                <button style={{ color: "#4a90d9" }}>🔍</button>
                <button style={{ color: "#718096" }}>⚙</button>
              </div>
            </div>

            <div
              className="flex items-center gap-1 px-4 py-2 text-sm overflow-x-auto"
              style={{
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
              }}
            >
              {[
                "すべて",
                "ア",
                "カ",
                "サ",
                "タ",
                "ナ",
                "ハ",
                "マ",
                "ヤ",
                "ラ",
                "ワ",
                "A〜Z",
                "0〜9",
                "その他",
                "名前なし",
              ].map((tab) => (
                <button
                  key={tab}
                  className="px-2 py-1 rounded text-sm whitespace-nowrap"
                  style={{ color: "#718096" }}
                >
                  {tab}
                </button>
              ))}
              <button
                className="ml-auto px-4 py-1.5 rounded text-sm text-white flex-shrink-0"
                style={{ backgroundColor: "#38a169" }}
              >
                アカウント作成 ＋
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div
                className="text-sm text-center py-8"
                style={{ color: "#a0aec0" }}
              >
                テーブル（3日目で実装）
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
