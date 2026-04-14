"use client";

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
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UserTable({ users, visibleColumns, onEdit, onDelete }: Props) {
  const show = (key: ColumnKey) => visibleColumns.includes(key);
  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-sm" style={{ color: "#a0aec0" }}>
        ユーザーがいません
      </div>
    );
  }

  return (
    <div
      className="rounded overflow-hidden"
      style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
    >
      <table className="w-full text-sm">
        <thead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#ffffff",
            zIndex: 10,
          }}
        >
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
              <div className="flex items-center gap-1">
                名前
                <ArrowDown size={12} style={{ color: "#a0aec0" }} />
              </div>
            </th>
            {show("employeeId") && (
              <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
                社員ID
              </th>
            )}
            {show("role") && (
              <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
                役職/階級
              </th>
            )}
            {show("department") && (
              <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
                部署
              </th>
            )}
            {show("company") && (
              <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
                <div className="flex items-center gap-1">
                  会社・所属
                  <SlidersHorizontal size={12} style={{ color: "#a0aec0" }} />
                </div>
              </th>
            )}
            <th className="text-left px-4 py-3 font-medium" style={{ color: "#a0aec0" }}>
              操作
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}
