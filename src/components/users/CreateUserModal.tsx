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
    border: "1px solid #d9dee7",
    borderRadius: "4px",
    padding: "3px 10px",
    fontSize: "12px",
    color: "#2d3748",
    outline: "none",
    width: "100%",
    height: "22px",
    backgroundColor: "#ffffff",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "11px",
    color: "#4a5568",
    marginBottom: "3px",
    display: "block",
    fontWeight: 600,
  };

  const attachedSelectStyle: React.CSSProperties = {
    ...inputStyle,
    width: "168px",
    flexShrink: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const attachedInputStyle: React.CSSProperties = {
    ...inputStyle,
    minWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    marginLeft: "-1px",
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
        className="w-full flex flex-col"
        style={{
          backgroundColor: "#ffffff",
          maxWidth: "590px",
          maxHeight: "92vh",
        }}
      >
        <div
          className="flex items-center justify-between flex-shrink-0"
          style={{
            borderLeft: "3px solid #38a169",
            padding: "10px 12px 8px 10px",
          }}
        >
          <h2 className="text-base font-semibold" style={{ color: "#276749" }}>
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

        <div className="overflow-y-auto flex-1 px-8 py-1 flex flex-col gap-3">
          <div
            className="rounded-lg"
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #eef1f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: "10px 12px",
            }}
          >
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: "#276749", fontSize: "13px" }}
            >
              ❖ 基本情報
            </h3>
            <div className="flex gap-8">
              <div className="flex-1 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
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

                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
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

                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
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

                <div className="grid grid-cols-2 gap-x-2 gap-y-2">
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
                className="flex flex-col items-center flex-shrink-0"
                style={{ width: "140px", paddingTop: "30px" }}
              >
                <div
                  className="rounded-full flex items-center justify-center relative"
                  style={{
                    width: "96px",
                    height: "96px",
                    backgroundColor: "#e1e1e1",
                  }}
                >
                  <UserIcon size={58} color="#8f8f8f" />
                  <button
                    className="absolute bottom-0 right-0 rounded-full flex items-center justify-center"
                    style={{
                      width: "22px",
                      height: "22px",
                      backgroundColor: "#38a169",
                      color: "#ffffff",
                      border: "3px solid #ffffff",
                    }}
                  >
                    <Camera size={12} />
                  </button>
                </div>
                <p
                  className="text-center"
                  style={{
                    color: "#718096",
                    fontSize: "9px",
                    lineHeight: 1.35,
                    marginTop: "10px",
                    width: "140px",
                  }}
                >
                  <span style={{ color: "#ef4444" }}>▲</span>
                  <br />
                  プロフィール画像は
                  <br />
                  ユーザ本人でも登録可能です。
                  <br />
                  <span style={{ display: "inline-block", marginTop: "6px" }}>
                    アップロードの際は
                  </span>
                  <br />
                  個人情報漏洩など
                  <br />
                  セキュリティリスクを
                  <br />
                  十分に考慮してください。
                </p>
              </div>
            </div>
          </div>

          <div
            className="rounded-lg"
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #eef1f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: "10px 12px",
            }}
          >
            <h3
              className="font-semibold mb-3 flex items-center gap-2"
              style={{ color: "#276749", fontSize: "13px" }}
            >
              ❖ 所属情報
            </h3>
            <div className="grid grid-cols-3 gap-2">
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
            className="rounded-lg"
            style={{
              backgroundColor: "#f9fafb",
              border: "1px solid #eef1f5",
              boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              padding: "10px 12px",
            }}
          >
            <h3
              className="font-semibold mb-3"
              style={{ color: "#276749", fontSize: "13px" }}
            >
              ❖ その他情報
            </h3>
            <div className="flex flex-col gap-2">
              <div>
                <label style={labelStyle}>メールアドレス</label>
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 min-w-0">
                    <select style={attachedSelectStyle}>
                      <option>社用メールアドレス</option>
                      <option>個人メールアドレス</option>
                    </select>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      style={attachedInputStyle}
                    />
                  </div>
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#38a169",
                      color: "#ffffff",
                    }}
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>電話番号</label>
                <div className="flex items-center gap-2">
                  <div className="flex flex-1 min-w-0">
                    <select style={attachedSelectStyle}>
                      <option>携帯電話</option>
                      <option>固定電話</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="090-1234-5678"
                      style={attachedInputStyle}
                    />
                  </div>
                  <button
                    className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      width: "18px",
                      height: "18px",
                      backgroundColor: "#38a169",
                      color: "#ffffff",
                    }}
                  >
                    <Plus size={11} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-3 py-3 flex-shrink-0">
          <button
            onClick={onClose}
            className="rounded transition-colors"
            style={{
              border: "1px solid #d9dee7",
              color: "#718096",
              padding: "8px 18px",
              fontSize: "12px",
              backgroundColor: "#ffffff",
            }}
          >
            キャンセル
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="rounded text-white flex items-center gap-2"
            style={{
              backgroundColor: isValid ? "#38a169" : "#a0aec0",
              cursor: isValid ? "pointer" : "not-allowed",
              padding: "8px 18px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            アカウント作成 ✓
          </button>
        </div>
      </div>
    </div>
  );
}
