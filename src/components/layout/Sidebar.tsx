"use client";

import Link from "next/link";
import { ChevronDown, ChevronUp, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { navItems } from "@/lib/navItems";

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

const ICON_AREA_WIDTH = 54;
const SIDEBAR_BG = "#43454d";
const HOVER_BG = "#54565e";
const OPEN_BG = "#4b4d55";
const TEXT_COLOR = "#e5e7eb";
const HOVER_TEXT_COLOR = "#a9d8ff";

export default function Sidebar({ expanded, onToggle }: Props) {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const sidebarWidth = expanded ? 210 : ICON_AREA_WIDTH;

  const iconArea = {
    minWidth: `${ICON_AREA_WIDTH}px`,
    width: `${ICON_AREA_WIDTH}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  } as React.CSSProperties;

  const rowStyle = (bg: string): React.CSSProperties => ({
    display: "flex",
    alignItems: "center",
    height: "38px",
    backgroundColor: bg,
    cursor: "pointer",
    width: "100%",
  });

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed transition-all duration-200"
        style={{
          top: "0px",
          left: "0px",
          width: `${sidebarWidth}px`,
          height: "44px",
          backgroundColor: SIDEBAR_BG,
          color: "#d8dae0",
          borderRight: "1px solid #585b65",
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
          top: "44px",
          width: sidebarWidth,
          backgroundColor: SIDEBAR_BG,
          overflowX: "hidden",
          overflowY: "auto",
          scrollbarWidth: "none",
          borderRight: "1px solid #585b65",
          zIndex: 20,
        }}
      >
        <nav>
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
                    className="text-sm transition-colors text-left"
                    style={{
                      ...rowStyle(isHovered ? HOVER_BG : isOpen ? OPEN_BG : "transparent"),
                      color: isHovered ? HOVER_TEXT_COLOR : TEXT_COLOR,
                    }}
                  >
                    <span style={iconArea}><Icon size={15} strokeWidth={1.75} /></span>
                    {expanded && (
                      <>
                        <span className="flex-1 whitespace-nowrap overflow-hidden text-ellipsis text-sm">
                          {item.label}
                        </span>
                        {isOpen
                          ? <ChevronDown size={13} className="flex-shrink-0 mr-3" />
                          : <ChevronUp size={13} className="flex-shrink-0 mr-3" />
                        }
                      </>
                    )}
                  </button>

                  {isOpen && (
                    <div style={{ backgroundColor: OPEN_BG }}>
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildHovered = hoveredItem === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            onMouseEnter={() => setHoveredItem(child.href)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="text-sm transition-colors"
                            style={{
                              ...rowStyle(isChildHovered ? HOVER_BG : "transparent"),
                              color: isChildHovered ? HOVER_TEXT_COLOR : TEXT_COLOR,
                              textDecoration: "none",
                            }}
                          >
                            <span style={iconArea}><ChildIcon size={15} strokeWidth={1.75} /></span>
                            {expanded && (
                              <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
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
                className="text-sm transition-colors"
                style={{
                  ...rowStyle(isHovered ? HOVER_BG : "transparent"),
                  color: isHovered ? HOVER_TEXT_COLOR : TEXT_COLOR,
                  textDecoration: "none",
                }}
              >
                <span style={iconArea}><Icon size={15} strokeWidth={1.75} /></span>
                {expanded && (
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis text-sm">
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
