"use client";

import { useState } from "react";
import { X, Camera, Plus, User as UserIcon } from "lucide-react";
import { User } from "@/types/user";

type Props = {
  user: User;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<User>) => void;
};

export default function EditUserModal({ user, onClose, onUpdate }: Props) {
  const [lastName, setLastName] = useState(user.lastName);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastNameKana, setLastNameKana] = useState(user.lastNameKana);
  const [firstNameKana, setFirstNameKana] = useState(user.firstNameKana);
  const [joinedAt, setJoinedAt] = useState(user.joinedAt);
  const [gender, setGender] = useState(user.gender);
  const [employmentStatus, setEmploymentStatus] = useState(
    user.employmentStatus || "在籍中",
  );
  const [employeeId, setEmployeeId] = useState(user.employeeId);
  const [password, setPassword] = useState(user.password);
  const [company, setCompany] = useState(user.company);
  const [department, setDepartment] = useState(user.department);
  const [role, setRole] = useState(user.role);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const handleSubmit = () => {
    if (!lastName || !firstName || !lastNameKana || !firstNameKana || !gender)
      return;
    onUpdate(user.id, {
      lastName,
      firstName,
      lastNameKana,
      firstNameKana,
      joinedAt,
      gender,
      employmentStatus,
      employeeId,
      password,
      company,
      department,
      role,
      email,
      phone,
    });
    onClose();
  };

  const isValid =
    lastName && firstName && lastNameKana && firstNameKana && gender;

  const inputStyle: React.CSSProperties = {
    border: "1px solid #cbd5e0",
    borderRadius: "4px",
    padding: "8px 12px",
    fontSize: "14px",
    color: "#2d3748",
    outline: "none",
    width: "100%",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "13px",
    color: "#4a5568",
    marginBottom: "4px",
    display: "block",
  };

  const requiredMark = (
    <span style={{ color: "#ef4444", marginLeft: "2px" }}>*</span>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <div
        className="rounded-lg shadow-xl w-full flex flex-col"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "680px",
          maxHeight: "90vh",
        }}
      >
        <div
          className="flex items-center justify-between px-6 py-4 flex-shrink-0"
          style={{ borderBottom: "3px solid #4a90d9" }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>
            ユーザー編集
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
            style={{ color: "#718096" }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 px-6 py-5 flex flex-col gap-5">
          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "#f7fafc", border: "1px solid #e2e8f0" }}
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "#4a90d9" }}
            >
              ❖ 基本情報
            </h3>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>姓{requiredMark}</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>名{requiredMark}</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>姓(カナ){requiredMark}</label>
                    <input
                      type="text"
                      value={lastNameKana}
                      onChange={(e) => setLastNameKana(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>名(カナ){requiredMark}</label>
                    <input
                      type="text"
                      value={firstNameKana}
                      onChange={(e) => setFirstNameKana(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>入社日</label>
                    <input
                      type="date"
                      value={joinedAt}
                      onChange={(e) => setJoinedAt(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>性別{requiredMark}</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="">-</option>
                      <option value="男性">男性</option>
                      <option value="女性">女性</option>
                      <option value="その他">その他</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>社員ID</label>
                    <input
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>在籍状態</label>
                    <select
                      value={employmentStatus}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                      style={inputStyle}
                    >
                      <option value="在籍中">在籍中</option>
                      <option value="退職済み">退職済み</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label style={labelStyle}>パスワード</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="変更する場合のみ入力"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              <div
                className="flex flex-col items-center gap-2 flex-shrink-0"
                style={{ width: "100px" }}
              >
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: "80px",
                    height: "80px",
                    backgroundColor: "#cbd5e0",
                  }}
                >
                  <UserIcon size={40} color="#718096" />
                  <button
                    className="absolute bottom-0 right-0 rounded-full flex items-center justify-center"
                    style={{
                      width: "24px",
                      height: "24px",
                      backgroundColor: "#4a90d9",
                      color: "#ffffff",
                    }}
                  >
                    <Camera size={12} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "#f7fafc", border: "1px solid #e2e8f0" }}
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "#4a90d9" }}
            >
              ❖ 所属情報
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label style={labelStyle}>会社・所属</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>部署</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>役職/階級</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "#f7fafc", border: "1px solid #e2e8f0" }}
          >
            <h3
              className="text-sm font-semibold mb-4"
              style={{ color: "#4a90d9" }}
            >
              ❖ その他情報
            </h3>
            <div className="flex flex-col gap-3">
              <div>
                <label style={labelStyle}>メールアドレス</label>
                <div className="flex items-center gap-2">
                  <select
                    style={{ ...inputStyle, width: "140px", flexShrink: 0 }}
                  >
                    <option>社用メールアドレス</option>
                    <option>個人メールアドレス</option>
                  </select>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#4a90d9",
                      color: "#ffffff",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              <div>
                <label style={labelStyle}>電話番号</label>
                <div className="flex items-center gap-2">
                  <select
                    style={{ ...inputStyle, width: "140px", flexShrink: 0 }}
                  >
                    <option>携帯電話</option>
                    <option>固定電話</option>
                  </select>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#4a90d9",
                      color: "#ffffff",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="flex justify-end gap-3 px-6 py-4 flex-shrink-0"
          style={{ borderTop: "1px solid #e2e8f0" }}
        >
          <button
            onClick={onClose}
            className="px-6 py-2 rounded text-sm"
            style={{ border: "1px solid #cbd5e0", color: "#4a5568" }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-6 py-2 rounded text-sm text-white"
            style={{
              backgroundColor: isValid ? "#4a90d9" : "#a0aec0",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            更新する
          </button>
        </div>
      </div>
    </div>
  );
}
