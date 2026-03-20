"use client";

import { useState } from "react";
import {
  Globe,
  Calendar,
  Wrench,
  BookOpen,
  Building2,
  Link,
  ClipboardList,
  BookUser,
  FileText,
} from "lucide-react";

const tabs = [
  { label: "ポータル",     icon: Globe },
  { label: "スケジュール", icon: Calendar },
  { label: "MYツール",     icon: Wrench },
  { label: "Eラーニング",  icon: BookOpen },
  { label: "施設予約",     icon: Building2 },
  { label: "リンク集",     icon: Link },
  { label: "掲示板",       icon: ClipboardList },
  { label: "アドレス帳",   icon: BookUser },
  { label: "設計図",       icon: FileText },
];

export default function TabBar() {
  const [activeTab, setActiveTab] = useState("ポータル");

  return (
    <div
      className="fixed left-0 right-0 z-20 flex items-center px-4"
      style={{
        top: "48px",
        height: "52px",
        backgroundColor: "#ffffff",
        borderBottom: "3px solid #4a90d9",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.label;
        return (
          <button
            key={tab.label}
            onClick={() => setActiveTab(tab.label)}
            className="flex flex-col items-center justify-center gap-0.5 px-3 py-1 transition-colors"
            style={{
              color: isActive ? "#4a90d9" : "#718096",
              minWidth: "60px",
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2 : 1.5} />
            <span className="text-xs whitespace-nowrap">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
