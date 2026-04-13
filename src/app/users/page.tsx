"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import OrgTree from "@/components/users/OrgTree";
import UserTable from "@/components/users/UserTable";
import KanaTab, { filterUsersByTab } from "@/components/users/KanaTab";
import Pagination from "@/components/users/Pagination";
import CreateUserModal from "@/components/users/CreateUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import { orgTree, getDescendantIds, UserWithOrg } from "@/lib/mockUsers";
import { User } from "@/types/user";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/lib/api/users";

const PAGE_SIZE = 10;

export default function UsersPage() {
  useEffect(() => {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, []);

  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>("a-honsha");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserWithOrg[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then(setUsers)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    let result: UserWithOrg[] = users;

    if (selectedOrgId && activeTab !== "all") {
      const descendantIds = getDescendantIds(orgTree, selectedOrgId);
      result = result.filter((u) => descendantIds.includes(u.orgId));
    }

    result = filterUsersByTab(result, activeTab) as UserWithOrg[];

    if (searchQuery) {
      result = result.filter(
        (u) =>
          `${u.lastName}${u.firstName}`.includes(searchQuery) ||
          `${u.lastNameKana}${u.firstNameKana}`.includes(searchQuery) ||
          u.employeeId.includes(searchQuery),
      );
    }

    return result;
  }, [users, selectedOrgId, activeTab, searchQuery]);

  const handleOrgSelect = (id: string | null) => {
    setSelectedOrgId(id);
    setCurrentPage(1);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCreate = async (data: Omit<User, "id">) => {
    const newUser = await createUser({
      ...data,
      orgId: selectedOrgId || "a-honsha",
    });
    setUsers((prev) => [...prev, newUser]);
  };

  const handleUpdate = async (id: string, data: Partial<User>) => {
    const updated = await updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
  };

  const handleDelete = async (user: User) => {
    await deleteUser(user.id);
    setUsers((prev) => prev.filter((u) => u.id !== user.id));
    setDeleteTarget(null);
    const newTotal = filteredUsers.length - 1;
    const newTotalPages = Math.ceil(newTotal / PAGE_SIZE);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  const getOrgName = (id: string | null): string => {
    if (!id) return "";
    const find = (nodes: typeof orgTree): string => {
      for (const n of nodes) {
        if (n.id === id) return n.name;
        if (n.children) {
          const found = find(n.children);
          if (found) return found;
        }
      }
      return "";
    };
    return find(orgTree);
  };

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);
  const pagedUsers = filteredUsers.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  return (
    <div className="h-screen overflow-hidden" style={{ backgroundColor: "#f0f2f5" }}>
      <Header sidebarWidth={sidebarWidth} />
      <TabBar sidebarWidth={sidebarWidth} />
      <Sidebar
        expanded={sidebarExpanded}
        onToggle={() => setSidebarExpanded((prev) => !prev)}
      />

      <main
        className="transition-all duration-200 flex flex-col overflow-hidden"
        style={{
          marginTop: "58px",
          marginLeft: `${sidebarWidth}px`,
          height: "calc(100vh - 58px)",
        }}
      >
        <div
          className="mx-4 mt-3 mb-3 rounded-lg flex-shrink-0"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e2e8f0",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="px-6 py-4 flex items-center justify-between gap-4"
            style={{ minHeight: "80px" }}
          >
            <div className="flex items-center gap-3">
              <h1 className="text-2xl" style={{ color: "#718096" }}>
                ユーザー管理
              </h1>
              <button
                className="flex items-center gap-1 px-3 py-1 rounded text-base"
                style={{ color: "#4a90d9" }}
              >
                在籍中のユーザー
                <span style={{ fontSize: "12px" }}>▼</span>
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 justify-start flex-1">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span style={{ color: "#38b6e8" }}>☰</span> 表示項目
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span style={{ color: "#38b6e8" }}>▽</span> フィルター
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span style={{ color: "#38b6e8" }}>↑</span> ソート
                </button>
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-xs whitespace-nowrap"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <span>日付を指定して過去のユーザー情報を表示</span>
                  <span style={{ color: "#38b6e8" }}>📅</span>
                </button>
                <button
                  className="px-2.5 py-1.5 rounded text-xs font-medium flex-shrink-0"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  指定
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex flex-1 min-h-0"
          style={{ padding: "0 4px 8px 16px" }}
        >
          <div
            className="rounded-l-lg flex flex-col overflow-hidden"
            style={{
              width: "280px",
              flexShrink: 0,
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRight: "none",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <OrgTree
              nodes={orgTree}
              selectedId={selectedOrgId}
              onSelect={handleOrgSelect}
            />
          </div>

          <div
            className="flex-1 flex flex-col overflow-hidden"
            style={{ minWidth: 0 }}
          >
            <div
              style={{
                flexShrink: 0,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "0 8px 0 0",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                className="flex items-center justify-between px-4 py-3"
                style={{ borderBottom: "1px solid #e2e8f0" }}
              >
                <div>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#a0aec0" }}
                  >
                    社員{" "}
                    <span style={{ color: "#38a169" }}>
                      {filteredUsers.length}
                    </span>
                  </span>
                  <div className="text-xs mt-0.5" style={{ color: "#a0aec0" }}>
                    {getOrgName(selectedOrgId)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center"
                    style={{
                      border: "1px solid #cbd5e0",
                      borderRadius: "6px",
                      paddingRight: "8px",
                      paddingLeft: "10px",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="連絡先・ユーザーを検索"
                      value={searchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      className="py-1 text-xs outline-none flex-1"
                      style={{
                        color: "#2d3748",
                        backgroundColor: "#ffffff",
                        border: "none",
                      }}
                    />
                    <button
                      style={{
                        color: "#4a90d9",
                        fontSize: "14px",
                        flexShrink: 0,
                      }}
                    >
                      🔍
                    </button>
                  </div>
                  <button style={{ color: "#718096", fontSize: "14px" }}>
                    ⚙
                  </button>
                </div>
              </div>

              <KanaTab
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onCreateClick={() => setShowCreateModal(true)}
              />
            </div>

            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                backgroundColor: "#ffffff",
                borderLeft: "1px solid #e2e8f0",
                borderRight: "1px solid #e2e8f0",
                padding: "16px",
              }}
            >
              {loading ? (
                <div
                  className="flex items-center justify-center h-full"
                  style={{ color: "#a0aec0", fontSize: "14px" }}
                >
                  読み込み中...
                </div>
              ) : error ? (
                <div
                  className="flex items-center justify-center h-full"
                  style={{ color: "#ef4444", fontSize: "14px" }}
                >
                  {error}
                </div>
              ) : (
                <UserTable
                  users={pagedUsers}
                  onEdit={(user) => setEditTarget(user)}
                  onDelete={(user) => setDeleteTarget(user)}
                />
              )}
            </div>

            <div
              style={{
                flexShrink: 0,
                backgroundColor: "#ffffff",
                border: "1px solid #e2e8f0",
                borderTop: "none",
                borderRadius: "0 0 8px 8px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              }}
            >
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
              <span style={{ fontWeight: 600, color: "#2d3748" }}>
                {deleteTarget.lastName} {deleteTarget.firstName}
              </span>{" "}
              を削除しますか？この操作は元に戻せません。
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
                onClick={() => handleDelete(deleteTarget)}
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
