"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react";
import { navItems } from "@/lib/navItems";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarWidth = collapsed ? 56 : 210;

  return (
    <aside
      className="fixed left-0 top-12 bottom-0 z-20 flex flex-col transition-all duration-300"
      style={{
        width: sidebarWidth,
        backgroundColor: "#2d3748",
        overflowX: "hidden",
      }}
    >
      {/* 折りたたみボタン */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center w-full py-3 transition-colors"
        style={{
          color: "#a0aec0",
          borderBottom: "1px solid #3d4f63",
          minHeight: "42px",
        }}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* ナビゲーション */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          const isOpen = openMenus[item.label];
          const isActive = item.href
            ? pathname === item.href
            : item.children?.some((c) => pathname === c.href);

          // サブメニューあり
          if (hasChildren) {
            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleMenu(item.label)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left"
                  style={{
                    color: isActive ? "#90cdf4" : "#cbd5e0",
                    backgroundColor: isActive ? "#3d4f63" : "transparent",
                  }}
                >
                  <Icon size={18} className="flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 whitespace-nowrap">{item.label}</span>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </>
                  )}
                </button>

                {/* サブメニュー */}
                {!collapsed && isOpen && (
                  <div style={{ backgroundColor: "#253141" }}>
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center pl-11 pr-4 py-2 text-sm transition-colors"
                        style={{
                          color: pathname === child.href ? "#90cdf4" : "#a0aec0",
                          backgroundColor: pathname === child.href ? "#3d4f63" : "transparent",
                          textDecoration: "none",
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // サブメニューなし
          return (
            <Link
              key={item.label}
              href={item.href!}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
              style={{
                color: isActive ? "#90cdf4" : "#cbd5e0",
                backgroundColor: isActive ? "#3d4f63" : "transparent",
                textDecoration: "none",
              }}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && (
                <span className="whitespace-nowrap">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
