"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { VpcStack } from "@/types/vpc";

type Props = {
  onClose: () => void;
  onCreate: (data: Omit<VpcStack, "id">) => void;
};

const STATUS_OPTIONS = [
  "CREATE_COMPLETE",
  "CREATE_FAILED",
  "CREATE_IN_PROGRESS",
  "DELETE_COMPLETE",
  "DELETE_FAILED",
  "UPDATE_COMPLETE",
];

export default function CreateModal({ onClose, onCreate }: Props) {
  const [stackName, setStackName] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!stackName || !status) return;
    onCreate({
      stackName,
      status,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: "",
      deletedAt: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="rounded-lg shadow-xl w-full max-w-md"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: "1px solid #e2e8f0" }}
        >
          <h2 className="text-base font-semibold" style={{ color: "#2d3748" }}>
            新規作成
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            style={{ color: "#718096" }}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#4a5568" }}>
              スタック名 <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="text"
              value={stackName}
              onChange={(e) => setStackName(e.target.value)}
              placeholder="スタック名を入力"
              className="px-3 py-2 rounded text-sm outline-none"
              style={{ border: "1px solid #cbd5e0", color: "#2d3748" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#4a5568" }}>
              ステータス <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-3 py-2 rounded text-sm outline-none"
              style={{
                border: "1px solid #cbd5e0",
                color: status ? "#2d3748" : "#a0aec0",
              }}
            >
              <option value="">選択してください</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium" style={{ color: "#4a5568" }}>
              説明
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="説明を入力"
              rows={3}
              className="px-3 py-2 rounded text-sm outline-none resize-none"
              style={{ border: "1px solid #cbd5e0", color: "#2d3748" }}
            />
          </div>
        </div>

        <div
          className="flex justify-end gap-3 px-6 py-4"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          <button
            onClick={onClose}
            className="px-4 py-2 rounded text-sm transition-colors"
            style={{
              border: "1px solid #cbd5e0",
              color: "#4a5568",
              backgroundColor: "#ffffff",
            }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!stackName || !status}
            className="px-4 py-2 rounded text-sm text-white transition-colors"
            style={{
              backgroundColor: !stackName || !status ? "#a0aec0" : "#4a90d9",
              cursor: !stackName || !status ? "not-allowed" : "pointer",
            }}
          >
            作成
          </button>
        </div>
      </div>
    </div>
  );
}
