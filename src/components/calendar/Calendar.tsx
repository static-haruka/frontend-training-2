"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Home, Settings } from "lucide-react";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];

export default function Calendar() {
  const today = new Date();
  const [current, setCurrent] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
  });

  const goToPrev = () => {
    setCurrent((prev) => {
      const d = new Date(prev.year, prev.month - 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const goToNext = () => {
    setCurrent((prev) => {
      const d = new Date(prev.year, prev.month + 1);
      return { year: d.getFullYear(), month: d.getMonth() };
    });
  };

  const goToToday = () => {
    setCurrent({ year: today.getFullYear(), month: today.getMonth() });
  };

  const { year, month } = current;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const prevDays = Array.from({ length: firstDay }, (_, i) =>
    daysInPrevMonth - firstDay + 1 + i
  );

  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const totalCells = 42;
  const nextDays = Array.from(
    { length: totalCells - prevDays.length - currentDays.length },
    (_, i) => i + 1
  );

  const isToday = (day: number) =>
    day === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  return (
    <div
      className="inline-block rounded"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e2e8f0",
        minWidth: "320px",
      }}
    >
      {/* カレンダーヘッダー */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderBottom: "1px solid #e2e8f0" }}
      >
        <button className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#718096" }}>
          <Settings size={16} />
        </button>
        <span className="flex-1 text-center font-medium text-sm" style={{ color: "#2d3748" }}>
          {year}年{month + 1}月
        </span>
        <div className="flex items-center gap-1">
          <button onClick={goToPrev} className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#718096" }}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={goToToday} className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#718096" }}>
            <Home size={16} />
          </button>
          <button onClick={goToNext} className="p-1 rounded hover:bg-gray-100 transition-colors" style={{ color: "#718096" }}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* 曜日ヘッダー */}
      <div className="grid grid-cols-7">
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className="text-center text-xs py-2 font-medium"
            style={{
              color: i === 0 || i === 6 ? "#ef4444" : "#4a5568",
              borderBottom: `2px solid ${i === 0 ? "#ef4444" : "#e2e8f0"}`,
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 日付グリッド */}
      <div className="grid grid-cols-7">
        {/* 前月 */}
        {prevDays.map((day, i) => (
          <div key={`prev-${i}`} className="text-center text-xs py-3" style={{ color: "#c0ccd8" }}>
            {day}
          </div>
        ))}

        {/* 当月 */}
        {currentDays.map((day) => {
          const colIndex = (firstDay + day - 1) % 7;
          const isSun = colIndex === 0;
          const isSat = colIndex === 6;
          const todayCell = isToday(day);

          return (
            <div
              key={`cur-${day}`}
              className="text-center text-xs py-3"
              style={{ color: isSun || isSat ? "#ef4444" : "#2d3748" }}
            >
              {todayCell ? (
                <span
                  style={{
                    display: "inline-block",
                    width: "28px",
                    height: "28px",
                    lineHeight: "28px",
                    backgroundColor: "#bfdbfe",
                    borderRadius: "4px",
                  }}
                >
                  {day}
                </span>
              ) : (
                day
              )}
            </div>
          );
        })}

        {/* 翌月 */}
        {nextDays.map((day, i) => (
          <div key={`next-${i}`} className="text-center text-xs py-3" style={{ color: "#c0ccd8" }}>
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
