"use client";

import { useState, useMemo } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import OrgTree from "@/components/users/OrgTree";
import UserTable from "@/components/users/UserTable";
import KanaTab, { filterUsersByTab } from "@/components/users/KanaTab";
import Pagination from "@/components/users/Pagination";
import CreateUserModal from "@/components/users/CreateUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import { orgTree, mockUsers as initialUsers } from "@/lib/mockUsers";
import { User } from "@/types/user";

const PAGE_SIZE = 5;

export default function UsersPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>("a-honsha");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    let result = filterUsersByTab(users, activeTab);
    if (searchQuery) {
      result = result.filter(
        (u) =>
          `${u.lastName}${u.firstName}`.includes(searchQuery) ||
          `${u.lastNameKana}${u.firstNameKana}`.includes(searchQuery) ||
          u.employeeId.includes(searchQuery),
      );
    }
    return result;
  }, [users, activeTab, searchQuery]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCreate = (data: Omit<User, "id">) => {
    const newUser: User = { ...data, id: String(Date.now()) };
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUpdate = (id: string, data: Partial<User>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
  };

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

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
          minHeight: "calc(100vh - 58px)",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold" style={{ color: "#2d3748" }}>
              ユーザー管理
            </h1>
            <button
              className="flex items-center gap-1 px-3 py-1 rounded text-sm"
              style={{ color: "#4a90d9", border: "1px solid #4a90d9" }}
            >
              在籍中のユーザー
              <span style={{ fontSize: "10px" }}>▼</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ☰ 表示項目
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ▽ フィルター
            </button>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              ↑ ソート
            </button>
          </div>
        </div>

        <div
          className="flex items-center justify-end gap-2 px-6 py-2"
          style={{
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <span className="text-sm" style={{ color: "#4a5568" }}>
            日付を指定して過去のユーザー情報を表示
          </span>
          <button
            className="px-2 py-1 rounded text-sm"
            style={{
              border: "1px solid #cbd5e0",
              color: "#4a5568",
              backgroundColor: "#ffffff",
            }}
          >
            📅
          </button>
          <button
            className="px-3 py-1 rounded text-sm"
            style={{
              border: "1px solid #cbd5e0",
              color: "#4a5568",
              backgroundColor: "#ffffff",
            }}
          >
            指定
          </button>
        </div>

        <div
          className="flex"
          style={{ height: "calc(100vh - 58px - 60px - 44px)" }}
        >
          <div
            style={{
              width: "280px",
              flexShrink: 0,
              backgroundColor: "#ffffff",
              borderRight: "1px solid #e2e8f0",
              overflowY: "auto",
            }}
          >
            <OrgTree
              nodes={orgTree}
              selectedId={selectedOrgId}
              onSelect={setSelectedOrgId}
            />
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                borderBottom: "1px solid #e2e8f0",
                backgroundColor: "#ffffff",
              }}
            >
              <div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "#2d3748" }}
                >
                  社員{" "}
                  <span style={{ color: "#4a90d9" }}>
                    {filteredUsers.length}
                  </span>
                </span>
                <div className="text-xs mt-0.5" style={{ color: "#a0aec0" }}>
                  Aテスト本社
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="連絡先・ユーザーを検索"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="px-3 py-1.5 text-sm rounded outline-none"
                  style={{
                    border: "1px solid #cbd5e0",
                    width: "220px",
                    color: "#2d3748",
                  }}
                />
                <button style={{ color: "#4a90d9" }}>🔍</button>
                <button style={{ color: "#718096" }}>⚙</button>
              </div>
            </div>

            <KanaTab
              activeTab={activeTab}
              onTabChange={handleTabChange}
              onCreateClick={() => setShowCreateModal(true)}
            />

            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <UserTable
                  users={pagedUsers}
                  onEdit={(user) => setEditTarget(user)}
                  onDelete={(user) => setDeleteTarget(user)}
                />
              </div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </main>

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreate}
        />
      )}

      {editTarget && (
        <EditUserModal
          user={editTarget}
          onClose={() => setEditTarget(null)}
          onUpdate={handleUpdate}
        />
      )}

      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
        >
          <div
            className="rounded-lg shadow-xl p-6 w-full max-w-sm"
            style={{ backgroundColor: "#ffffff" }}
          >
            <h2
              className="text-base font-semibold mb-2"
              style={{ color: "#2d3748" }}
            >
              削除の確認
            </h2>
            <p className="text-sm mb-6" style={{ color: "#718096" }}>
              {deleteTarget.lastName} {deleteTarget.firstName} を削除しますか？
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded text-sm"
                style={{ border: "1px solid #cbd5e0", color: "#4a5568" }}
              >
                キャンセル
              </button>
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded text-sm text-white"
                style={{ backgroundColor: "#ef4444" }}
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
