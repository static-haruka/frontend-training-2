"use client";

import { useState } from "react";
import { X, Camera, Plus, User as UserIcon } from "lucide-react";
import { User } from "@/types/user";

type Props = {
  onClose: () => void;
  onCreate: (data: Omit<User, "id">) => void;
};

export default function CreateUserModal({ onClose, onCreate }: Props) {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [gender, setGender] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("在籍中");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    if (
      !lastName ||
      !firstName ||
      !lastNameKana ||
      !firstNameKana ||
      !gender ||
      !password
    )
      return;
    onCreate({
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
    lastName &&
    firstName &&
    lastNameKana &&
    firstNameKana &&
    gender &&
    password;

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
          className="flex items-center justify-between py-4 flex-shrink-0"
          style={{
            borderLeft: "3px solid #38a169",
            paddingLeft: "16px",
            paddingRight: "24px",
          }}
        >
          <h2 className="text-lg font-semibold" style={{ color: "#2d3748" }}>
            新規アカウント作成
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
              className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ color: "#38a169" }}
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
                      placeholder="山田"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>名{requiredMark}</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="太郎"
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
                      placeholder="ヤマダ"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>名(カナ){requiredMark}</label>
                    <input
                      type="text"
                      value={firstNameKana}
                      onChange={(e) => setFirstNameKana(e.target.value)}
                      placeholder="タロウ"
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
                      style={{
                        ...inputStyle,
                        color: gender ? "#2d3748" : "#a0aec0",
                      }}
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
                    <label style={labelStyle}>パスワード{requiredMark}</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="password"
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
                      backgroundColor: "#38a169",
                      color: "#ffffff",
                    }}
                  >
                    <Camera size={12} />
                  </button>
                </div>
                <p className="text-xs text-center" style={{ color: "#718096" }}>
                  プロフィール画像は
                  <br />
                  ユーザー本人でも
                  <br />
                  登録可能です。
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg p-5"
            style={{ backgroundColor: "#f7fafc", border: "1px solid #e2e8f0" }}
          >
            <h3
              className="text-sm font-semibold mb-4 flex items-center gap-2"
              style={{ color: "#38a169" }}
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
                  placeholder="会社・所属"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>部署</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="部署"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>役職/階級</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="役職/階級"
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
              style={{ color: "#38a169" }}
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
                    placeholder="name@example.com"
                    style={inputStyle}
                  />
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#38a169",
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
                    placeholder="090-1234-5678"
                    style={inputStyle}
                  />
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "28px",
                      height: "28px",
                      backgroundColor: "#38a169",
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
            className="px-6 py-2 rounded text-sm transition-colors"
            style={{ border: "1px solid #cbd5e0", color: "#4a5568" }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="px-6 py-2 rounded text-sm text-white flex items-center gap-2"
            style={{
              backgroundColor: isValid ? "#38a169" : "#a0aec0",
              cursor: isValid ? "pointer" : "not-allowed",
            }}
          >
            アカウント作成 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
