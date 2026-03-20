"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import Calendar from "@/components/calendar/Calendar";

export default function Home() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const marginLeft = sidebarExpanded ? 210 : 56;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f2f5" }}>
      <Header />
      <TabBar />
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />
      <main
        className="transition-all duration-200"
        style={{
          marginTop: "100px",
          marginLeft: `${marginLeft}px`,
          padding: "24px",
          minHeight: "calc(100vh - 100px)",
        }}
      >
        <Calendar />
      </main>
    </div>
  );
}
