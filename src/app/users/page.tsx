"use client";

import { useState, useMemo, useEffect } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import TabBar from "@/components/layout/TabBar";
import OrgTree from "@/components/users/OrgTree";
import UserTable, {
  ALL_COLUMNS,
  ColumnKey,
} from "@/components/users/UserTable";
import KanaTab, { filterUsersByTab } from "@/components/users/KanaTab";
import Pagination from "@/components/users/Pagination";
import CreateUserModal from "@/components/users/CreateUserModal";
import EditUserModal from "@/components/users/EditUserModal";
import { orgTree, getDescendantIds, UserWithOrg } from "@/lib/mockUsers";
import { User } from "@/types/user";
import { getUsers, createUser, updateUser, deleteUser } from "@/lib/api/users";
import { SlidersHorizontal } from "lucide-react";

const PAGE_SIZE = 10;
const DEFAULT_ORG_ID = "a-honsha";
type FilterMenuAnchor = "toolbar" | "search";

type UserFilterKey =
  | "gender"
  | "employeeId"
  | "role"
  | "department"
  | "company";

type UserFilters = Record<UserFilterKey, string>;

type UserDateFilters = {
  joinedAtFrom: string;
  joinedAtTo: string;
};

const EMPTY_FILTERS: UserFilters = {
  gender: "",
  employeeId: "",
  role: "",
  department: "",
  company: "",
};

const EMPTY_DATE_FILTERS: UserDateFilters = {
  joinedAtFrom: "",
  joinedAtTo: "",
};

const FILTER_FIELDS: { key: UserFilterKey; label: string }[] = [
  { key: "gender", label: "性別" },
  { key: "employeeId", label: "社員ID" },
  { key: "role", label: "役職/階級" },
  { key: "department", label: "部署" },
  { key: "company", label: "会社・所属" },
];

const EMPLOYMENT_STATUS_OPTIONS = [
  { value: "在籍中", label: "在籍中のユーザー" },
  { value: "退職済み", label: "退職済みのユーザー" },
  { value: "", label: "すべてのユーザー" },
];

const isDateValue = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const isOnOrAfter = (value: string, date: string) =>
  isDateValue(value) && value >= date;

const isOnOrBefore = (value: string, date: string) =>
  isDateValue(value) && value <= date;

const getEmploymentStatus = (user: User) =>
  user.employmentStatus || "在籍中";

const collectOrgIds = (nodes: typeof orgTree): string[] =>
  nodes.flatMap((node) => [
    node.id,
    ...(node.children ? collectOrgIds(node.children) : []),
  ]);

const ORG_IDS = new Set(collectOrgIds(orgTree));

const normalizeUserOrg = (
  user: UserWithOrg,
  fallbackOrgId = DEFAULT_ORG_ID,
): UserWithOrg => ({
  ...user,
  orgId: ORG_IDS.has(user.orgId) ? user.orgId : fallbackOrgId,
});

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
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(
    DEFAULT_ORG_ID,
  );
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState<UserWithOrg[]>([]);
  const [employmentStatusFilter, setEmploymentStatusFilter] = useState("在籍中");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleColumns, setVisibleColumns] = useState<ColumnKey[]>(
    ALL_COLUMNS.map((c) => c.key),
  );
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  const [filters, setFilters] = useState<UserFilters>(EMPTY_FILTERS);
  const [dateFilters, setDateFilters] =
    useState<UserDateFilters>(EMPTY_DATE_FILTERS);
  const [asOfDateInput, setAsOfDateInput] = useState("");
  const [asOfDate, setAsOfDate] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filterMenuAnchor, setFilterMenuAnchor] =
    useState<FilterMenuAnchor | null>(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showEmploymentStatusMenu, setShowEmploymentStatusMenu] =
    useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editTarget, setEditTarget] = useState<User | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<User | null>(null);

  useEffect(() => {
    getUsers()
      .then((data) => setUsers(data.map((user) => normalizeUserOrg(user))))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredUsers = useMemo(() => {
    let result: UserWithOrg[] = users;

    if (selectedOrgId) {
      const descendantIds = getDescendantIds(orgTree, selectedOrgId);
      result = result.filter((u) => descendantIds.includes(u.orgId));
    }

    if (employmentStatusFilter) {
      result = result.filter(
        (u) => getEmploymentStatus(u) === employmentStatusFilter,
      );
    }

    result = filterUsersByTab(result, activeTab) as UserWithOrg[];

    if (searchQuery) {
      result = result.filter(
        (u) =>
          `${u.lastName}${u.firstName}`.includes(searchQuery) ||
          `${u.lastNameKana}${u.firstNameKana}`.includes(searchQuery) ||
          u.employeeId.includes(searchQuery) ||
          u.email.includes(searchQuery) ||
          u.phone.includes(searchQuery),
      );
    }

    FILTER_FIELDS.forEach(({ key }) => {
      const value = filters[key];
      if (value) {
        result = result.filter((u) => u[key] === value);
      }
    });

    if (dateFilters.joinedAtFrom) {
      result = result.filter((u) =>
        isOnOrAfter(u.joinedAt, dateFilters.joinedAtFrom),
      );
    }

    if (dateFilters.joinedAtTo) {
      result = result.filter((u) =>
        isOnOrBefore(u.joinedAt, dateFilters.joinedAtTo),
      );
    }

    if (asOfDate) {
      result = result.filter((u) => isOnOrBefore(u.joinedAt, asOfDate));
    }

    if (sortOption) {
      result = [...result].sort((a, b) => {
        switch (sortOption) {
          case "name-asc":
            return `${a.lastNameKana}${a.firstNameKana}`.localeCompare(
              `${b.lastNameKana}${b.firstNameKana}`,
            );
          case "name-desc":
            return `${b.lastNameKana}${b.firstNameKana}`.localeCompare(
              `${a.lastNameKana}${a.firstNameKana}`,
            );
          case "joinedAt-asc":
            return a.joinedAt.localeCompare(b.joinedAt);
          case "joinedAt-desc":
            return b.joinedAt.localeCompare(a.joinedAt);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [
    users,
    selectedOrgId,
    employmentStatusFilter,
    activeTab,
    searchQuery,
    filters,
    dateFilters,
    asOfDate,
    sortOption,
  ]);

  const filterOptions = useMemo(() => {
    return FILTER_FIELDS.reduce(
      (acc, { key }) => {
        acc[key] = Array.from(
          new Set(users.map((user) => user[key]).filter(Boolean)),
        ).sort((a, b) => a.localeCompare(b, "ja"));
        return acc;
      },
      {} as Record<UserFilterKey, string[]>,
    );
  }, [users]);

  const activeFilterCount = [
    ...Object.values(filters),
    ...Object.values(dateFilters),
    asOfDate,
  ].filter(Boolean).length;

  const employmentStatusLabel =
    EMPLOYMENT_STATUS_OPTIONS.find(
      (option) => option.value === employmentStatusFilter,
    )?.label || "すべてのユーザー";

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
      orgId: selectedOrgId || DEFAULT_ORG_ID,
    });
    setUsers((prev) => [
      ...prev,
      normalizeUserOrg(newUser, selectedOrgId || DEFAULT_ORG_ID),
    ]);
  };

  const handleUpdate = async (id: string, data: Partial<User>) => {
    const updated = await updateUser(id, data);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? normalizeUserOrg(updated, u.orgId) : u)),
    );
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

  const renderFilterMenu = (align: "left" | "right" = "left") => (
    <>
      <div
        onClick={() => setFilterMenuAnchor(null)}
        style={{ position: "fixed", inset: 0, zIndex: 99 }}
      />
      <div
        style={{
          position: "absolute",
          top: "calc(100% + 4px)",
          ...(align === "right" ? { right: 0 } : { left: 0 }),
          zIndex: 100,
          backgroundColor: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "6px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          padding: "10px",
          minWidth: "240px",
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <p
            style={{
              fontSize: "11px",
              color: "#a0aec0",
              padding: "0 0 2px",
            }}
          >
            絞り込み条件
          </p>
          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                setFilters({ ...EMPTY_FILTERS });
                setDateFilters({ ...EMPTY_DATE_FILTERS });
                setAsOfDateInput("");
                setAsOfDate("");
                setCurrentPage(1);
              }}
              className="rounded"
              style={{
                padding: "2px 6px",
                fontSize: "11px",
                color: "#38a169",
              }}
            >
              クリア
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {FILTER_FIELDS.map(({ key, label }) => (
            <label
              key={key}
              className="flex flex-col gap-1"
              style={{ fontSize: "12px", color: "#4a5568" }}
            >
              {label}
              <select
                value={filters[key]}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilters((prev) => ({
                    ...prev,
                    [key]: value,
                  }));
                  setCurrentPage(1);
                }}
                className="rounded"
                style={{
                  border: "1px solid #cbd5e0",
                  color: filters[key] ? "#2d3748" : "#a0aec0",
                  backgroundColor: "#ffffff",
                  padding: "6px 8px",
                  fontSize: "13px",
                  outline: "none",
                }}
              >
                <option value="">すべて</option>
                {filterOptions[key].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <div
            className="grid grid-cols-2 gap-2"
            style={{ paddingTop: "2px" }}
          >
            <label
              className="flex flex-col gap-1"
              style={{ fontSize: "12px", color: "#4a5568" }}
            >
              入社日（開始）
              <input
                type="date"
                value={dateFilters.joinedAtFrom}
                onChange={(e) => {
                  setDateFilters((prev) => ({
                    ...prev,
                    joinedAtFrom: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="rounded"
                style={{
                  border: "1px solid #cbd5e0",
                  color: dateFilters.joinedAtFrom ? "#2d3748" : "transparent",
                  backgroundColor: "#ffffff",
                  padding: "6px 8px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </label>
            <label
              className="flex flex-col gap-1"
              style={{ fontSize: "12px", color: "#4a5568" }}
            >
              入社日（終了）
              <input
                type="date"
                value={dateFilters.joinedAtTo}
                onChange={(e) => {
                  setDateFilters((prev) => ({
                    ...prev,
                    joinedAtTo: e.target.value,
                  }));
                  setCurrentPage(1);
                }}
                className="rounded"
                style={{
                  border: "1px solid #cbd5e0",
                  color: dateFilters.joinedAtTo ? "#2d3748" : "transparent",
                  backgroundColor: "#ffffff",
                  padding: "6px 8px",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </label>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div
      className="h-screen overflow-hidden"
      style={{ backgroundColor: "#f0f2f5" }}
    >
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
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => {
                    setShowEmploymentStatusMenu((prev) => !prev);
                    setShowColumnsMenu(false);
                    setFilterMenuAnchor(null);
                    setShowSortMenu(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1 rounded text-base"
                  style={{ color: "#4a90d9" }}
                >
                  {employmentStatusLabel}
                  <span style={{ fontSize: "12px" }}>▼</span>
                </button>
                {showEmploymentStatusMenu && (
                  <>
                    <div
                      onClick={() => setShowEmploymentStatusMenu(false)}
                      style={{ position: "fixed", inset: 0, zIndex: 99 }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "calc(100% + 4px)",
                        left: 0,
                        zIndex: 100,
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        padding: "6px",
                        minWidth: "160px",
                      }}
                    >
                      {EMPLOYMENT_STATUS_OPTIONS.map((option) => (
                        <button
                          key={option.label}
                          onClick={() => {
                            setEmploymentStatusFilter(option.value);
                            setShowEmploymentStatusMenu(false);
                            setCurrentPage(1);
                          }}
                          className="w-full text-left rounded"
                          style={{
                            display: "block",
                            padding: "6px 8px",
                            fontSize: "13px",
                            color:
                              employmentStatusFilter === option.value
                                ? "#4a90d9"
                                : "#2d3748",
                            backgroundColor:
                              employmentStatusFilter === option.value
                                ? "#ebf8ff"
                                : "transparent",
                          }}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2 justify-start flex-1">
                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      setShowColumnsMenu((prev) => !prev);
                      setFilterMenuAnchor(null);
                      setShowSortMenu(false);
                      setShowEmploymentStatusMenu(false);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                    style={{
                      border: `1px solid ${visibleColumns.length < ALL_COLUMNS.length ? "#4a90d9" : "#cbd5e0"}`,
                      color:
                        visibleColumns.length < ALL_COLUMNS.length
                          ? "#4a90d9"
                          : "#4a5568",
                      backgroundColor:
                        visibleColumns.length < ALL_COLUMNS.length
                          ? "#ebf8ff"
                          : "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        color:
                          visibleColumns.length < ALL_COLUMNS.length
                            ? "#4a90d9"
                            : "#38b6e8",
                      }}
                    >
                      ☰
                    </span>{" "}
                    表示項目
                  </button>
                  {showColumnsMenu && (
                    <>
                      <div
                        onClick={() => setShowColumnsMenu(false)}
                        style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          left: 0,
                          zIndex: 100,
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          padding: "6px",
                          minWidth: "140px",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#a0aec0",
                            padding: "4px 8px 6px",
                          }}
                        >
                          表示する列
                        </p>
                        {ALL_COLUMNS.map((col) => {
                          const checked = visibleColumns.includes(col.key);
                          return (
                            <button
                              key={col.key}
                              onClick={() =>
                                setVisibleColumns((prev) =>
                                  checked
                                    ? prev.filter((k) => k !== col.key)
                                    : [...prev, col.key],
                                )
                              }
                              className="w-full text-left rounded flex items-center gap-2"
                              style={{
                                padding: "6px 8px",
                                fontSize: "13px",
                                color: "#2d3748",
                              }}
                            >
                              <span
                                style={{
                                  width: "14px",
                                  height: "14px",
                                  borderRadius: "3px",
                                  border: `1px solid ${checked ? "#4a90d9" : "#cbd5e0"}`,
                                  backgroundColor: checked
                                    ? "#4a90d9"
                                    : "#ffffff",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                  color: "#ffffff",
                                  fontSize: "10px",
                                }}
                              >
                                {checked ? "✓" : ""}
                              </span>
                              {col.label}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>

                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      setFilterMenuAnchor((prev) =>
                        prev === "toolbar" ? null : "toolbar",
                      );
                      setShowSortMenu(false);
                      setShowEmploymentStatusMenu(false);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                    style={{
                      border: `1px solid ${activeFilterCount ? "#38a169" : "#cbd5e0"}`,
                      color: activeFilterCount ? "#38a169" : "#4a5568",
                      backgroundColor: activeFilterCount ? "#f0fff4" : "#ffffff",
                    }}
                  >
                    <span
                      style={{
                        color: activeFilterCount ? "#38a169" : "#38b6e8",
                      }}
                    >
                      ▽
                    </span>
                    フィルター{activeFilterCount ? `：${activeFilterCount}` : ""}
                  </button>
                  {filterMenuAnchor === "toolbar" && renderFilterMenu()}
                </div>

                <div style={{ position: "relative" }}>
                  <button
                    onClick={() => {
                      setShowSortMenu((prev) => !prev);
                      setFilterMenuAnchor(null);
                      setShowEmploymentStatusMenu(false);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-sm"
                    style={{
                      border: `1px solid ${sortOption ? "#4a90d9" : "#cbd5e0"}`,
                      color: sortOption ? "#4a90d9" : "#4a5568",
                      backgroundColor: sortOption ? "#ebf8ff" : "#ffffff",
                    }}
                  >
                    <span style={{ color: sortOption ? "#4a90d9" : "#38b6e8" }}>
                      ↑
                    </span>
                    ソート
                  </button>
                  {showSortMenu && (
                    <>
                      <div
                        onClick={() => setShowSortMenu(false)}
                        style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "calc(100% + 4px)",
                          left: 0,
                          zIndex: 100,
                          backgroundColor: "#ffffff",
                          border: "1px solid #e2e8f0",
                          borderRadius: "6px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                          padding: "6px",
                          minWidth: "150px",
                        }}
                      >
                        {[
                          { value: "", label: "デフォルト" },
                          { value: "name-asc", label: "氏名（昇順）" },
                          { value: "name-desc", label: "氏名（降順）" },
                          { value: "joinedAt-asc", label: "入社日（昇順）" },
                          { value: "joinedAt-desc", label: "入社日（降順）" },
                        ].map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortOption(opt.value);
                              setShowSortMenu(false);
                            }}
                            className="w-full text-left rounded"
                            style={{
                              display: "block",
                              padding: "6px 8px",
                              fontSize: "13px",
                              color:
                                sortOption === opt.value
                                  ? "#4a90d9"
                                  : "#2d3748",
                              backgroundColor:
                                sortOption === opt.value
                                  ? "#ebf8ff"
                                  : "transparent",
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2">
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded text-xs whitespace-nowrap"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: "#4a5568",
                    backgroundColor: "#ffffff",
                  }}
                >
                  <input
                    type="text"
                    placeholder="日付を指定して過去のユーザー情報を表示"
                    value={asOfDateInput}
                    onChange={(e) => setAsOfDateInput(e.target.value)}
                    style={{
                      border: "none",
                      color: "#2d3748",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      fontSize: "12px",
                      width: "250px",
                    }}
                  />
                  <span style={{ color: "#38b6e8", flexShrink: 0 }}>📅</span>
                </div>
                <button
                  onClick={() => {
                    setAsOfDate(asOfDateInput);
                    setCurrentPage(1);
                  }}
                  disabled={!isDateValue(asOfDateInput)}
                  className="px-2.5 py-1.5 rounded text-xs font-medium flex-shrink-0"
                  style={{
                    border: "1px solid #cbd5e0",
                    color: isDateValue(asOfDateInput) ? "#4a5568" : "#a0aec0",
                    backgroundColor: "#ffffff",
                    cursor: isDateValue(asOfDateInput)
                      ? "pointer"
                      : "not-allowed",
                  }}
                >
                  指定
                </button>
                {asOfDate && (
                  <button
                    onClick={() => {
                      setAsOfDateInput("");
                      setAsOfDate("");
                      setCurrentPage(1);
                    }}
                    className="px-2.5 py-1.5 rounded text-xs font-medium flex-shrink-0"
                    style={{
                      border: "1px solid #cbd5e0",
                      color: "#38a169",
                      backgroundColor: "#f0fff4",
                    }}
                  >
                    解除
                  </button>
                )}
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
                  <div style={{ position: "relative" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setFilterMenuAnchor((prev) =>
                          prev === "search" ? null : "search",
                        );
                        setShowColumnsMenu(false);
                        setShowSortMenu(false);
                        setShowEmploymentStatusMenu(false);
                      }}
                      aria-label="詳細検索条件を開く"
                      className="rounded flex items-center justify-center"
                      style={{
                        color: activeFilterCount ? "#38a169" : "#718096",
                        backgroundColor: "transparent",
                        width: "28px",
                        height: "28px",
                      }}
                    >
                      <SlidersHorizontal size={20} />
                    </button>
                    {filterMenuAnchor === "search" && renderFilterMenu("right")}
                  </div>
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
                padding: "0 16px 16px",
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
                  visibleColumns={visibleColumns}
                  columnFilters={filters}
                  columnFilterOptions={filterOptions}
                  onColumnFilterChange={(key, value) => {
                    setFilters((prev) => ({
                      ...prev,
                      [key]: value,
                    }));
                    setCurrentPage(1);
                  }}
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
