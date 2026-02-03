"use client";
import React, { useState } from "react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

type AppliedFilters = {
  startDate: string;
  endDate: string;
  categories: string[];
};

const toISODateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getDefaultDateRange = () => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);
  return { startDate: toISODateLocal(start), endDate: toISODateLocal(end) };
};

function Filter({
  setShowFilter,
  onDateChange,
  onApply,
  onClear,
  categoryOptions,
  defaultCategories = [],
  defaultStartDate,
  defaultEndDate,
}: {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  onDateChange?: (startDate: string, endDate: string) => void;
  onApply?: (filters: AppliedFilters) => void;
  onClear?: () => void;
  categoryOptions?: string[];
  defaultStartDate?: string;
  defaultEndDate?: string;
  defaultCategories?: string[];
}) {
  const initialRange = getDefaultDateRange();
  const [startDate, setStartDate] = useState(
    defaultStartDate ?? initialRange.startDate
  );
  const [endDate, setEndDate] = useState(defaultEndDate ?? initialRange.endDate);
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(defaultCategories);
  const [activePeriod, setActivePeriod] = useState<string | null>(null);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    setActivePeriod("Custom");
    if (onDateChange) {
      onDateChange(date, endDate);
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    setActivePeriod("Custom");
    if (onDateChange) {
      onDateChange(startDate, date);
    }
  };

  const applyPreset = (preset: string) => {
    const now = new Date();
    let start = new Date(now);
    let end = new Date(now);

    if (preset === "Today") {
      start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      end = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (preset === "This week") {
      const day = now.getDay();
      const diff = (day + 6) % 7;
      start = new Date(now);
      start.setDate(now.getDate() - diff);
      end = new Date(now);
    } else if (preset === "This Month") {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = new Date(now);
    } else if (preset === "Previous Month") {
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      end = new Date(now.getFullYear(), now.getMonth(), 0);
    } else if (preset === "This Year") {
      start = new Date(now.getFullYear(), 0, 1);
      end = new Date(now);
    }

    const nextStart = toISODateLocal(start);
    const nextEnd = toISODateLocal(end);
    setStartDate(nextStart);
    setEndDate(nextEnd);
    setActivePeriod(preset);
    onDateChange?.(nextStart, nextEnd);
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
  return (
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50"
      onClick={() => setShowFilter(false)}
    >
      <div
        className="bg-white p-5 max-w-sm rounded-lg relative z-50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setShowFilter(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div> */}
        <h2 className="text-lg mb-4">Filters</h2>
        <h3 className="text-sm font-medium">Period</h3>
        <div className="flex flex-wrap gap-5 mt-3">
          {["Today", "This week", "This Month", "Previous Month", "This Year"].map(
            (label) => {
              const isSelected = activePeriod === label;
              return (
                <button
                  key={label}
                  type="button"
                  className={`border text-sm py-[2px] px-2 rounded-xs cursor-pointer ${
                    isSelected
                      ? "border-secondary bg-secondary text-white"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => applyPreset(label)}
                >
                  {label}
                </button>
              );
            }
          )}
        </div>
        <h3 className="text-sm font-medium my-5">Select Period</h3>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded px-3 py-2 cursor-pointer">
              <span className="text-blue-600">
                <HiOutlineCalendarDateRange />
              </span>
              <span className="text-sm text-gray-700">
                {formatDisplayDate(startDate)}
              </span>
            </div>
            <input
              type="date"
              value={startDate}
              onChange={(e) => handleStartDateChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <span className="text-gray-500">-</span>

          <div className="relative">
            <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded px-3 py-2 cursor-pointer">
              <span className="text-blue-600">
                <HiOutlineCalendarDateRange />
              </span>
              <span className="text-sm text-gray-700">
                {formatDisplayDate(endDate)}
              </span>
            </div>
            <input
              type="date"
              value={endDate}
              onChange={(e) => handleEndDateChange(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-pointer"
              min={startDate}
            />
          </div>
        </div>
        {categoryOptions && categoryOptions.length > 0 && (
          <>
            <h3 className="text-sm font-medium my-5">Categories</h3>
            <div className="flex flex-wrap gap-3 mt-3">
              {categoryOptions.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setSelectedCategories((prev) =>
                        prev.includes(category)
                          ? prev.filter((c) => c !== category)
                          : [...prev, category]
                      )
                    }
                    className={`border text-sm py-[2px] px-2 rounded-xs cursor-pointer ${isSelected
                        ? "border-secondary bg-secondary text-white"
                        : "border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </>
        )}
        <div className="grid grid-cols-2 gap-3 my-6">
          <button
            type="button"
            className="w-full border border-gray-300 py-2 text-lg text-black rounded-md text-center"
            onClick={() => {
              const range = getDefaultDateRange();
              setStartDate(range.startDate);
              setEndDate(range.endDate);
              setSelectedCategories([]);
              setActivePeriod(null);
              onClear?.();
              setShowFilter(false);
            }}
          >
            Clear
          </button>
          <button
            type="button"
            className="w-full bg-secondary py-2 text-lg text-white rounded-md text-center"
            onClick={() => {
              onApply?.({
                startDate,
                endDate,
                categories: selectedCategories,
              });
              setShowFilter(false);
            }}
          >
            Display
          </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
