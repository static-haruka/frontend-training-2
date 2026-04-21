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
    <div className="min-h-screen" style={{ backgroundColor: "#eef2f6" }}>
      <Header sidebarWidth={sidebarWidth} showAccountInfo={false} />
      <TabBar sidebarWidth={sidebarWidth} />
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />
      <main
        className="transition-all duration-200"
        style={{
          marginTop: "51px",
          marginLeft: `${sidebarWidth}px`,
          padding: "16px 18px",
          minHeight: "calc(100vh - 51px)",
        }}
      >
        <Calendar />
      </main>
    </div>
  );
}
