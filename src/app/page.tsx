"use client";

import { useState, useEffect } from "react";
import { RefreshCw } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import CreateModal from "@/components/vpc/CreateModal";
import { VpcStack } from "@/types/vpc";
import { getStacks, createStack } from "@/lib/api/vpc";

const STATUS_OPTIONS = [
  "CREATE_COMPLETE",
  "CREATE_FAILED",
];

export default function VpcPage() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const sidebarWidth = sidebarExpanded ? 210 : 56;

  const [stacks, setStacks] = useState<VpcStack[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [filterName, setFilterName] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [appliedName, setAppliedName] = useState("");
  const [appliedStatus, setAppliedStatus] = useState("");

  // GETリクエスト
  const fetchStacks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getStacks();
      setStacks(data);
    } catch (e) {
      setError("データの取得に失敗しました");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  // 初回マウント時に一覧取得
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

  // POSTリクエスト
  const handleCreate = async (data: Omit<VpcStack, "id">) => {
    try {
      const newStack = await createStack(data);
      setStacks((prev) => [...prev, newStack]);
    } catch (e) {
      console.error(e);
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
          <label className="text-sm" style={{ color: "#4a5568" }}>スタック名</label>
          <input
            type="text"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="スタック名を入力"
            className="px-3 py-1.5 rounded text-sm outline-none"
            style={{ border: "1px solid #cbd5e0", color: "#2d3748", width: "200px" }}
          />
          <label className="text-sm ml-4" style={{ color: "#4a5568" }}>ステータス</label>
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
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <div className="flex gap-2 ml-auto">
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded text-sm transition-colors"
              style={{ border: "1px solid #cbd5e0", color: "#4a5568", backgroundColor: "#ffffff" }}
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
            style={{ border: "1px solid #cbd5e0", color: "#718096", backgroundColor: "#e2e8f0" }}
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
          className="rounded overflow-hidden"
          style={{ border: "1px solid #e2e8f0", backgroundColor: "#ffffff" }}
        >
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid #e2e8f0" }}>
                {["スタック名", "ステータス", "説明", "作成日時", "更新日時", "削除日時"].map((col) => (
                  <th key={col} className="text-left px-4 py-3 font-medium" style={{ color: "#4a5568" }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm" style={{ color: "#a0aec0" }}>
                    読み込み中...
                  </td>
                </tr>
              ) : filteredStacks.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-sm" style={{ color: "#a0aec0" }}>
                    データがありません
                  </td>
                </tr>
              ) : (
                filteredStacks.map((stack) => (
                  <tr key={stack.id} style={{ borderBottom: "1px solid #f0f2f5" }}>
                    <td className="px-4 py-3" style={{ color: "#4a90d9" }}>{stack.stackName}</td>
                    <td className="px-4 py-3" style={{ color: stack.status === "CREATE_FAILED" ? "#ef4444" : "#2d3748" }}>
                      {stack.status}
                    </td>
                    <td className="px-4 py-3" style={{ color: "#2d3748" }}>{stack.description}</td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>{formatDate(stack.createdAt)}</td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>{formatDate(stack.updatedAt)}</td>
                    <td className="px-4 py-3" style={{ color: "#718096" }}>{formatDate(stack.deletedAt)}</td>
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
    </div>
  );
}
