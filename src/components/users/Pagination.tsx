"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);
    if (end - start < 4) start = Math.max(1, end - 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const btnStyle = (active: boolean): React.CSSProperties => ({
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "13px",
    cursor: "pointer",
    border: "none",
    backgroundColor: active ? "#4a90d9" : "transparent",
    color: active ? "#ffffff" : "#4a5568",
    fontWeight: active ? 600 : 400,
  });

  const iconBtnStyle: React.CSSProperties = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    backgroundColor: "transparent",
    color: "#718096",
    cursor: "pointer",
    borderRadius: "50%",
  };

  return (
    <div className="flex items-center justify-center gap-1 py-4">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        style={{ ...iconBtnStyle, opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <ChevronsLeft size={16} />
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ ...iconBtnStyle, opacity: currentPage === 1 ? 0.4 : 1 }}
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={btnStyle(page === currentPage)}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          ...iconBtnStyle,
          opacity: currentPage === totalPages ? 0.4 : 1,
        }}
      >
        <ChevronRight size={16} />
      </button>

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{
          ...iconBtnStyle,
          opacity: currentPage === totalPages ? 0.4 : 1,
        }}
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
}
