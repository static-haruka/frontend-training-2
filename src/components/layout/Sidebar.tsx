"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Grid3X3,
  Cloud,
  BookOpen,
  Film,
  Network,
  BarChart3,
  UserCog,
} from "lucide-react";

// メニュー項目
const navItems = [
  { label: "ダッシュボード", icon: LayoutDashboard, href: "/dashboard" },
  { label: "ポータル",       icon: Grid3X3,        href: "/portal" },
  { label: "AWS",            icon: Cloud,          href: "/aws" },
  { label: "電子書籍",       icon: BookOpen,       href: "/ebooks" },
  { label: "動画管理",       icon: Film,           href: "/videos" },
  { label: "VPC",            icon: Network,        href: "/vpc" },
  { label: "経営ダッシュボード", icon: BarChart3,  href: "/management-dashboard" },
  { label: "ユーザー管理",   icon: UserCog,        href: "/users" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-12 bottom-0 z-20 flex flex-col"
      style={{
        width: "210px",
        backgroundColor: "#2d3748",
      }}
    >
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
              style={{
                color: isActive ? "#90cdf4" : "#cbd5e0",
                backgroundColor: isActive ? "#3d4f63" : "transparent",
                textDecoration: "none",
              }}
            >
              <Icon size={18} className="flex-shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
