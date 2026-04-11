"use client";

import { useState, useEffect } from "react";
import { RefreshCw, Pencil, Trash2 } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import CreateModal from "@/components/vpc/CreateModal";
import EditModal from "@/components/vpc/EditModal";
import { VpcStack } from "@/types/vpc";
import {
  getStacks,
  createStack,
  updateStack,
  deleteStack,
} from "@/lib/api/vpc";

const STATUS_OPTIONS = ["CREATE_COMPLETE", "CREATE_FAILED"];

export default function VpcPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;

  const [stacks, setStacks] = useState<VpcStack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState<VpcStack | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [appliedName, setAppliedName] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("");

  const fetchStacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStacks();
      setStacks(data.filter((s) => s.id));
    } catch (e) {
      setError("データの取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStacks();
  }, []);

  const handleFilter = () => {
    setAppliedName(filterName);
    setAppliedStatus(filterStatus);
  };

  const handleReset = () => {
    setFilterName("");
    setFilterStatus("");
    setAppliedName("");
    setAppliedStatus("");
  };

  const handleCreate = async (data: Omit<VpcStack, "id">) => {
    try {
      setError(null);
      const newStack = await createStack(data);

      if (newStack.id) {
        setStacks((prev) => [...prev, newStack]);
      } else {
        await fetchStacks();
      }
    } catch (e) {
      console.error(e);
      setError("作成に失敗しました");
      alert("作成に失敗しました");
    }
  };

  const handleUpdate = async (id: string, data: Partial<VpcStack>) => {
    try {
      setError(null);
      const updated = await updateStack(id, data);
      setStacks((prev) => prev.map((s) => (s.id === id ? updated : s)));
      setEditTarget(null);
    } catch (e) {
      console.error(e);
      setError("更新に失敗しました");
      alert("更新に失敗しました");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteStack(id);
      setStacks((prev) => prev.filter((s) => s.id !== id));
      setDeleteTargetId(null);
    } catch (e) {
      console.error(e);
      setError("削除に失敗しました");
      alert("削除に失敗しました");
    }
  };

  const filteredStacks = stacks.filter((s) => {
    const matchName = appliedName
      ? s.stackName.toLowerCase().includes(appliedName.toLowerCase())
      : true;
    const matchStatus = appliedStatus ? s.status === appliedStatus : true;
    return matchName && matchStatus;
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

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
          padding: "24px",
          minHeight: "calc(100vh - 58px)",
        }}
      >
        <h1 className="text-lg font-semibold mb-4" style={{ color: "#2d3748" }}>
          VPC
        </h1>

        <div
          className="flex items-center gap-4 px-4 py-3 rounded mb-4"
          style={{ backgroundColor: "#ffffff", border: "1px solid #e2e8f0" }}
        >
          <label className="text-sm" style={{ color: "#4a5568" }}>
            スタック名
          </label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="スタック名を入力"
            className="px-3 py-1.5 rounded text-sm outline-none"
            style={{
              border: "1px solid #cbd5e0",
              color: "#2d3748",
              width: "200px",
            }}
          />
          <label className="text-sm ml-4" style={{ color: "#4a5568" }}>
            ステータス
          </label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 rounded text-sm outline-none"
            style={{
              border: "1px solid #cbd5e0",
              color: filterStatus ? "#2d3748" : "#a0aec0",
              width: "200px",
            }}
          >
            <option value="">選択してください</option>
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded text-sm transition-colors"
              style={{
                border: "1px solid #cbd5e0",
                color: "#4a5568",
                backgroundColor: "#ffffff",
              }}
            >
              リセット
            </button>
            <button
              onClick={handleFilter}
              className="px-4 py-1.5 rounded text-sm text-white"
              style={{ backgroundColor: "#4a90d9" }}
            >
              フィルター
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-2 mb-2">
          <button
            onClick={fetchStacks}
            className="p-2 rounded transition-colors active:opacity-60"
            style={{
              border: "1px solid #cbd5e0",
              color: "#718096",
              backgroundColor: "#e2e8f0",
            }}
          >
            <RefreshCw size={15} />
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 rounded text-sm text-white"
            style={{ backgroundColor: "#4a90d9" }}
          >
            新規作成
          </button>
        </div>

        {error && (
          <div
            className="mb-3 px-4 py-2 rounded text-sm"
            style={{ backgroundColor: "#fed7d7", color: "#c53030" }}
          >
            {error}
          </div>
        )}

        <div
          className="rounded overflow-x-auto"
          style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
        >
          <table className="w-full text-sm" style={{ minWidth: "900px" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                {[
                  "スタック名",
                  "ステータス",
                  "説明",
                  "作成日時",
                  "更新日時",
                  "削除日時",
                  "操作",
                ].map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 font-medium"
                    style={{ color: "#4a5568" }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-sm"
                    style={{ color: "#a0aec0" }}
                  >
                    読み込み中...
                  </td>
                </tr>
              ) : filteredStacks.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-8 text-sm"
                    style={{ color: "#a0aec0" }}
                  >
                    データがありません
                  </td>
                </tr>
              ) : (
                filteredStacks.map((stack) => (
                  <tr
                    key={stack.id}
                    style={{ borderBottom: "1px solid #f0f2f5" }}
                  >
                    <td className="px-4 py-3" style={{ color: "#4a90d9" }}>
                      {stack.stackName}
                    </td>
                    <td
                      className="px-4 py-3"
                      style={{
                        color:
                          stack.status === "CREATE_FAILED"
                            ? "#ef4444"
                            : "#2d3748",
                      }}
                    >
                      {stack.status}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#2d3748" }}>
                      {stack.description}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>
                      {formatDate(stack.createdAt)}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>
                      {formatDate(stack.updatedAt)}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>
                      {formatDate(stack.deletedAt)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditTarget(stack)}
                          className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors"
                          style={{
                            backgroundColor: "#4a90d9",
                            color: "#ffffff",
                          }}
                        >
                          <Pencil size={12} />
                          編集
                        </button>
                        <button
                          onClick={() => setDeleteTargetId(stack.id)}
                          className="flex items-center gap-1 px-3 py-1 rounded text-xs transition-colors"
                          style={{
                            backgroundColor: "#ef4444",
                            color: "#ffffff",
                          }}
                        >
                          <Trash2 size={12} />
                          削除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <CreateModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreate}
        />
      )}

      {editTarget && editTarget.id && (
        <EditModal
          stack={editTarget}
          onClose={() => setEditTarget(null)}
          onUpdate={handleUpdate}
        />
      )}

      {deleteTargetId && (
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
              このスタックを削除しますか？この操作は元に戻せません。
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="px-4 py-2 rounded text-sm"
                style={{ border: "1px solid #cbd5e0", color: "#4a5568" }}
              >
                キャンセル
              </button>
              <button
                onClick={() => handleDelete(deleteTargetId)}
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
