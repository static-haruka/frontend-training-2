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
  { label: "ポータル", icon: Globe, bg: "#7ab9ff", edge: "#62a9f4", glow: "#d9ebff" },
  { label: "スケジュール", icon: Calendar, bg: "#63d3d8", edge: "#4cbfc6", glow: "#daf9fb" },
  { label: "MYツール", icon: Wrench, bg: "#ff7e84", edge: "#f06d74", glow: "#ffd7da" },
  { label: "Eラーニング", icon: BookOpen, bg: "#8ea0ff", edge: "#7b8ff1", glow: "#e0e5ff" },
  { label: "施設予約", icon: Building2, bg: "#ffb06c", edge: "#f09a52", glow: "#ffe6cf" },
  { label: "リンク集", icon: Link, bg: "#7da7ff", edge: "#6a95f1", glow: "#dfe8ff" },
  { label: "掲示板", icon: ClipboardList, bg: "#ff8a8e", edge: "#ef767b", glow: "#ffd9dc" },
  { label: "アドレス帳", icon: BookUser, bg: "#6dd694", edge: "#59c080", glow: "#daf7e4" },
  { label: "設計図", icon: FileText, bg: "#ffc46f", edge: "#f2af4f", glow: "#ffedd2" },
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
      style={{ top: "44px", left: `${sidebarWidth}px`, zIndex: 30 }}
    >
      {showTabs && (
        <div
          className="flex items-end px-3"
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
                className="flex flex-col items-center justify-end gap-0.5 px-1.5 py-1 transition-colors"
                style={{
                  color: isActive ? "#1e78cf" : "#6f84a1",
                  minWidth: "52px",
                }}
              >
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "6px",
                    background: `linear-gradient(180deg, ${tab.glow} 0%, ${tab.bg} 58%, ${tab.edge} 100%)`,
                    border: `1px solid ${tab.edge}`,
                    boxShadow: isActive
                      ? "0 0 0 2px rgba(59,155,244,0.18)"
                      : "inset 0 1px 0 rgba(255,255,255,0.85)",
                    color: "#ffffff",
                  }}
                >
                  <Icon size={14} strokeWidth={2} />
                </span>
                <span
                  className="whitespace-nowrap"
                  style={{
                    fontSize: "9px",
                    lineHeight: 1.1,
                    fontWeight: isActive ? 700 : 500,
                  }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      )}

      <div className="flex" style={{ height: "7px" }}>
        <button
          onClick={() => setShowTabs((prev) => !prev)}
          className="hover:opacity-80 transition-opacity flex-shrink-0 flex items-center justify-center"
          style={{
            width: "72px",
            height: "7px",
            backgroundColor: "#7bb8eb",
          }}
        >
          {showTabs
            ? <ChevronUp size={9} color="#ffffff" strokeWidth={3} />
            : <ChevronDown size={9} color="#ffffff" strokeWidth={3} />
          }
        </button>
        <div className="flex-1" style={{ backgroundColor: "#1c74c8" }} />
      </div>
    </div>
  );
}
