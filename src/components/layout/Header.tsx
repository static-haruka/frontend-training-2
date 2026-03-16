"use client";

import { User } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6"
      style={{
        height: "48px",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
      }}
    >
      <h1
        className="text-xl font-semibold"
        style={{ color: "#2d3748", letterSpacing: "0.05em" }}
      >
        管理CMS
      </h1>
      <div
        className="flex items-center gap-2 text-sm"
        style={{ color: "#4a5568" }}
      >
        <span>admin：Aテスト本社</span>
        <User size={16} />
        <span>テスト管理者 ユーザー</span>
      </div>
    </header>
  );
}
