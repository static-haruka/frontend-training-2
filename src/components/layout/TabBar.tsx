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
  ChevronDown,
  ChevronUp,
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

type Props = {
  sidebarWidth: number;
};

export default function TabBar({ sidebarWidth }: Props) {
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("ポータル");

  return (
    <div
      className="fixed right-0 transition-all duration-200"
      style={{ top: "48px", left: `${sidebarWidth}px`, zIndex: 30 }}
    >
      {showTabs && (
        <div
          className="flex items-center px-4"
          style={{
            height: "52px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
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
      )}

      <div className="flex" style={{ height: "10px" }}>
        <button
          onClick={() => setShowTabs((prev) => !prev)}
          className="hover:opacity-70 transition-opacity flex-shrink-0 flex items-center justify-center"
          style={{
            width: "100px",
            height: "10px",
            backgroundColor: "#7ab8e8",
          }}
        >
          {showTabs
            ? <ChevronUp size={10} color="#ffffff" strokeWidth={3} />
            : <ChevronDown size={10} color="#ffffff" strokeWidth={3} />
          }
        </button>
        <div className="flex-1" style={{ backgroundColor: "#4a90d9" }} />
      </div>
    </div>
  );
}
