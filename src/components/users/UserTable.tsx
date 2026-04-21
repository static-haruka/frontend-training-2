"use client";

import { useState } from "react";
import { User } from "@/types/user";
import { ArrowDown, SlidersHorizontal, Pencil, Trash2 } from "lucide-react";

export type ColumnKey = "employeeId" | "role" | "department" | "company";

export const ALL_COLUMNS: { key: ColumnKey; label: string }[] = [
  { key: "employeeId", label: "社員ID" },
  { key: "role", label: "役職/階級" },
  { key: "department", label: "部署" },
  { key: "company", label: "会社・所属" },
];

type Props = {
  users: User[];
  visibleColumns: ColumnKey[];
  columnFilters: Record<ColumnKey, string>;
  columnFilterOptions: Record<ColumnKey, string[]>;
  onColumnFilterChange: (key: ColumnKey, value: string) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UserTable({
  users,
  visibleColumns,
  columnFilters,
  columnFilterOptions,
  onColumnFilterChange,
  onEdit,
  onDelete,
}: Props) {
  const [openFilterColumn, setOpenFilterColumn] = useState<ColumnKey | null>(
    null,
  );
  const show = (key: ColumnKey) => visibleColumns.includes(key);
  const visibleColumnCount = visibleColumns.length + 2;
  const headerCellStyle: React.CSSProperties = {
    color: "#a0aec0",
    position: "relative",
    backgroundColor: "#ffffff",
    boxShadow: "inset 0 -1px 0 #e2e8f0",
  };

  const renderFilterHeader = (key: ColumnKey, label: string) => {
    const isOpen = openFilterColumn === key;
    const isActive = Boolean(columnFilters[key]);

    return (
      <th
        className="text-left px-4 py-3 font-medium"
        style={headerCellStyle}
      >
        <div
          className="flex items-center gap-1"
          style={{ position: "relative" }}
        >
          {label}
          <button
            type="button"
            onClick={() => setOpenFilterColumn(isOpen ? null : key)}
            className="rounded"
            style={{
              color: isActive ? "#38a169" : "#a0aec0",
              padding: "2px",
              lineHeight: 1,
            }}
            aria-label={`${label}で絞り込む`}
          >
            <SlidersHorizontal size={12} />
          </button>
        </div>
        {isOpen && (
          <>
            <div
              onClick={() => setOpenFilterColumn(null)}
              style={{ position: "fixed", inset: 0, zIndex: 99 }}
            />
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: "16px",
                zIndex: 100,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                padding: "6px",
                minWidth: "150px",
              }}
            >
              <button
                type="button"
                onClick={() => {
                  onColumnFilterChange(key, "");
                  setOpenFilterColumn(null);
                }}
                className="w-full text-left rounded"
                style={{
                  display: "block",
                  padding: "6px 8px",
                  fontSize: "13px",
                  color: columnFilters[key] ? "#2d3748" : "#38a169",
                  backgroundColor: columnFilters[key]
                    ? "transparent"
                    : "#f0fff4",
                }}
              >
                すべて
              </button>
              {columnFilterOptions[key].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    onColumnFilterChange(key, value);
                    setOpenFilterColumn(null);
                  }}
                  className="w-full text-left rounded"
                  style={{
                    display: "block",
                    padding: "6px 8px",
                    fontSize: "13px",
                    color:
                      columnFilters[key] === value ? "#38a169" : "#2d3748",
                    backgroundColor:
                      columnFilters[key] === value ? "#f0fff4" : "transparent",
                  }}
                >
                  {value}
                </button>
              ))}
            </div>
          </>
        )}
      </th>
    );
  };

  return (
    <div
      className="rounded"
      style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
    >
      <table
        className="w-full text-sm"
        style={{ borderCollapse: "separate", borderSpacing: 0 }}
      >
        <thead
          style={{
            position: "sticky",
            top: 0,
            zIndex: 30,
            backgroundColor: "#ffffff",
          }}
        >
          <tr>
            <th
              className="text-left px-4 py-3 font-medium"
              style={headerCellStyle}
            >
              <div className="flex items-center gap-1">
                名前
                <ArrowDown size={12} style={{ color: "#a0aec0" }} />
              </div>
            </th>
            {show("employeeId") && (
              renderFilterHeader("employeeId", "社員ID")
            )}
            {show("role") && (
              renderFilterHeader("role", "役職/階級")
            )}
            {show("department") && (
              renderFilterHeader("department", "部署")
            )}
            {show("company") && (
              renderFilterHeader("company", "会社・所属")
            )}
            <th
              className="text-left px-4 py-3 font-medium"
              style={headerCellStyle}
            >
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={visibleColumnCount}
                className="text-center py-12 text-sm"
                style={{ color: "#a0aec0" }}
              >
                ユーザーがいません
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id} style={{ borderBottom: "1px solid #f0f2f5" }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "#cbd5e0",
                      }}
                    />
                    <span style={{ color: "#a0aec0" }}>
                      {user.lastName} {user.firstName}
                    </span>
                  </div>
                </td>
                {show("employeeId") && (
                  <td className="px-4 py-3" style={{ color: "#a0aec0" }}>
                    {user.employeeId}
                  </td>
                )}
                {show("role") && (
                  <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                    {user.role}
                  </td>
                )}
                {show("department") && (
                  <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                    {user.department}
                  </td>
                )}
                {show("company") && (
                  <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                    {user.company}
                  </td>
                )}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(user)}
                      className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors font-medium"
                      style={{ backgroundColor: "#38a169", color: "#ffffff" }}
                    >
                      編集
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => onDelete(user)}
                      className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors font-medium"
                      style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
                    >
                      削除
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
