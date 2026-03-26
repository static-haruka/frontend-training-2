"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import Calendar from "@/components/calendar/Calendar";

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;

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
          padding: "24px",
          minHeight: "calc(100vh - 58px)",
        }}
      >
        <Calendar />
      </main>
    </div>
  );
}
