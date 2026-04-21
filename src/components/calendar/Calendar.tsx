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
  const [selectedDate, setSelectedDate] = useState({
    year: today.getFullYear(),
    month: today.getMonth(),
    day: today.getDate(),
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

  const isSelected = (day: number) =>
    day === selectedDate.day &&
    month === selectedDate.month &&
    year === selectedDate.year;

  const isPastDay = (day: number) =>
    new Date(year, month, day) < new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate(),
    );

  const isPastMonth =
    year < today.getFullYear() ||
    (year === today.getFullYear() && month < today.getMonth());

  const isCurrentMonth =
    month === today.getMonth() &&
    year === today.getFullYear();

  const cellStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "53px",
    fontSize: "12px",
    paddingTop: "7px",
    position: "relative",
  };

  const iconButtonStyle: React.CSSProperties = {
    width: "24px",
    height: "24px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "6px",
    backgroundColor: "#f6f7f9",
    color: "#7b8088",
  };

  return (
    <div
      className="inline-block"
      style={{
        backgroundColor: "#ffffff",
        minWidth: "304px",
        borderRadius: "8px",
        boxShadow: "0 1px 10px rgba(0,0,0,0.06)",
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3"
      >
        <button
          className="transition-colors"
          style={iconButtonStyle}
        >
          <Settings size={16} />
        </button>
        <span
          className="flex-1 text-center font-medium text-sm"
          style={{ color: "#61656d", letterSpacing: "0.2em" }}
        >
          {year}年{month + 1}月
        </span>
        <div className="flex items-center gap-1">
          <button onClick={goToPrev} className="transition-colors" style={iconButtonStyle}>
            <ChevronLeft size={16} />
          </button>
          <button onClick={goToToday} className="transition-colors" style={iconButtonStyle}>
            <Home size={16} />
          </button>
          <button onClick={goToNext} className="transition-colors" style={iconButtonStyle}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div
        className="grid grid-cols-7 px-1"
        style={{ borderBottom: "2px solid #3b9bf4" }}
      >
        {WEEKDAYS.map((day, i) => (
          <div
            key={day}
            className="text-center font-medium"
            style={{
              color: i === 0 || i === 6 ? "#ef4444" : "#4a5568",
              fontSize: "9px",
              paddingBottom: "7px",
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 px-1 pb-4">
        {prevDays.map((day, i) => (
          <div
            key={`prev-${i}`}
            style={{
              ...cellStyle,
              color: i % 7 === 0 || i % 7 === 6 ? "#f2b2b2" : "#cfd3d9",
            }}
          >
            {day}
          </div>
        ))}

        {currentDays.map((day) => {
          const colIndex = (firstDay + day - 1) % 7;
          const isSun = colIndex === 0;
          const isSat = colIndex === 6;
          const selectedCell = isSelected(day);
          const pastDay = isPastMonth || (isCurrentMonth && isPastDay(day));

          return (
            <div
              key={`cur-${day}`}
              onClick={() => setSelectedDate({ year, month, day })}
              style={{
                ...cellStyle,
                color: pastDay
                  ? "#cfd3d9"
                  : isSun || isSat
                    ? "#ef4444"
                    : "#1f2937",
                cursor: "pointer",
              }}
            >
              {selectedCell && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "36px",
                    height: "100%",
                    backgroundColor: "#bfdcf7",
                    borderRadius: "5px",
                  }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>{day}</span>
            </div>
          );
        })}

        {nextDays.map((day, i) => {
          const colIndex = (firstDay + currentDays.length + i) % 7;
          const isSun = colIndex === 0;
          const isSat = colIndex === 6;
          const nextMonthColor = isPastMonth
            ? isSun || isSat
              ? "#f2b2b2"
              : "#cfd3d9"
            : isSun || isSat
              ? "#ef4444"
              : "#1f2937";

          return (
            <div
              key={`next-${i}`}
              style={{
                ...cellStyle,
                color: nextMonthColor,
              }}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
}
