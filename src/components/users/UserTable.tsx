"use client";

import { User } from "@/types/user";
import { Pencil, Trash2, ArrowDown, SlidersHorizontal } from "lucide-react";

type Props = {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export default function UserTable({ users, onEdit, onDelete }: Props) {
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
        <thead>
          <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
              <div className="flex items-center gap-1">
                名前
                <ArrowDown size={12} style={{ color: "#a0aec0" }} />
              </div>
            </th>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
              社員ID
            </th>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
              役職/階級
            </th>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
              部署
            </th>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
              <div className="flex items-center gap-1">
                会社・所属
                <SlidersHorizontal size={12} style={{ color: "#a0aec0" }} />
              </div>
            </th>
            <th
              className="text-left px-4 py-3 font-medium"
              style={{ color: "#4a5568" }}
            >
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
                  <span style={{ color: "#4a90d9" }}>
                    {user.lastName} {user.firstName}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3" style={{ color: "#4a90d9" }}>
                {user.employeeId}
              </td>
              <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                {user.role}
              </td>
              <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                {user.department}
              </td>
              <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                {user.company}
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors"
                    style={{ backgroundColor: "#38a169", color: "#ffffff" }}
                  >
                    <Pencil size={12} />
                    編集
                  </button>
                  <button
                    onClick={() => onDelete(user)}
                    className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors"
                    style={{ backgroundColor: "#ef4444", color: "#ffffff" }}
                  >
                    <Trash2 size={12} />
                    削除
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
