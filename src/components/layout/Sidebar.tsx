"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/navItems";

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

export default function Sidebar({ expanded, onToggle }: Props) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarWidth = expanded ? 210 : 56;

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed transition-all duration-200"
        style={{
          top: "0px",
          left: "0px",
          width: `${sidebarWidth}px`,
          height: "48px",
          backgroundColor: "#1a202c",
          color: "#e2e8f0",
          borderBottom: "1px solid #3d4f63",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: expanded ? "flex-end" : "center",
          paddingRight: expanded ? "16px" : "0",
        }}
      >
        {expanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      <aside
        className="fixed left-0 bottom-0 flex flex-col transition-all duration-200"
        style={{
          top: "48px",
          width: sidebarWidth,
          backgroundColor: "#2d3748",
          overflowX: "hidden",
          zIndex: 20,
        }}
      >
        <nav className="flex-1 overflow-y-auto py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasChildren = item.children && item.children.length > 0;
            const isOpen = openMenus[item.label];
            const isHovered = hoveredItem === item.label;

            if (hasChildren) {
              return (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    onMouseEnter={() => setHoveredItem(item.label)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left"
                    style={{
                      color: isHovered ? "#90cdf4" : "#e2e8f0",
                      backgroundColor: isOpen ? "#1a202c" : "transparent",
                    }}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {expanded && (
                      <>
                        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
                          {item.label}
                        </span>
                        {isOpen
                          ? <ChevronDown size={14} className="flex-shrink-0" />
                          : <ChevronUp size={14} className="flex-shrink-0" />
                        }
                      </>
                    )}
                  </button>

                  {isOpen && (
                    <div style={{ backgroundColor: "#1a202c" }}>
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildHovered = hoveredItem === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onMouseEnter={() => setHoveredItem(child.href)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="flex items-center gap-3 px-4 py-2 text-sm transition-colors"
                            style={{
                              color: isChildHovered ? "#90cdf4" : "#e2e8f0",
                              backgroundColor: "transparent",
                              textDecoration: "none",
                            }}
                          >
                            <ChildIcon size={18} className="flex-shrink-0" />
                            {expanded && (
                              <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                {child.label}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href!}
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors"
                style={{
                  color: isHovered ? "#90cdf4" : "#e2e8f0",
                  backgroundColor: "transparent",
                  textDecoration: "none",
                }}
              >
                <Icon size={18} className="flex-shrink-0" />
                {expanded && (
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
