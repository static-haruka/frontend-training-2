"use client";

import { User } from "lucide-react";

type Props = {
  sidebarWidth: number;
};

export default function Header({ sidebarWidth }: Props) {
  const titleLeft = sidebarWidth + 24 + 160;

  return (
    <header
      className="fixed top-0 right-0 z-30 flex items-center"
      style={{
        left: "0px",
        height: "48px",
        backgroundColor: "#ffffff",
        paddingRight: "24px",
      }}
    >
      <h1
        className="absolute text-xl font-semibold"
        style={{
          left: `${titleLeft}px`,
          transform: "translateX(-50%)",
          color: "#2d3748",
          letterSpacing: "0.05em",
          whiteSpace: "nowrap",
        }}
      >
        管理CMS
      </h1>
      <div
        className="ml-auto flex items-center gap-2 text-sm flex-shrink-0"
        style={{ color: "#4a5568" }}
      >
        <span>admin：Aテスト本社</span>
        <User size={16} />
        <span>テスト管理者 ユーザー</span>
      </div>
    </header>
  );
}
