"use client";

import { User } from "lucide-react";

export default function Header() {
  return (
    <header
      className="fixed top-0 right-0 z-30 flex flex-col"
      style={{
        left: "0px",
        height: "48px",
        backgroundColor: "#ffffff",
      }}
    >
      <div className="flex items-center flex-1 px-6">
        <h1
          className="absolute left-1/2 -translate-x-1/2 text-xl font-semibold"
          style={{ color: "#2d3748", letterSpacing: "0.05em" }}
        >
          管理CMS
        </h1>
        <div
          className="ml-auto flex items-center gap-2 text-sm"
          style={{ color: "#4a5568" }}
        >
          <span>admin：Aテスト本社</span>
          <User size={16} />
          <span>テスト管理者 ユーザー</span>
        </div>
      </div>
    </header>
  );
}
