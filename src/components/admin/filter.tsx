"use client";
import React, { useState } from "react";
import { HiOutlineCalendarDateRange } from "react-icons/hi2";

function Filter({
  setShowFilter,
  onDateChange,
  defaultStartDate = "2023-09-15",
  defaultEndDate = "2023-09-20",
}: {
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;
  onDateChange?: (startDate: string, endDate: string) => void;
  defaultStartDate?: string;
  defaultEndDate?: string;
}) {
  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
    if (onDateChange) {
      onDateChange(date, endDate);
    }
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
    if (onDateChange) {
      onDateChange(startDate, date);
    }
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
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Today
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            This week
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            This Month
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Previous Month
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            This Year
          </span>
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
        <h3 className="text-sm font-medium my-5">Categories</h3>
        <div className="flex flex-wrap gap-5 mt-3">
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Men
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Women
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Kids
          </span>
          <span className="border  border-gray-300 text-sm py-[2px] px-2 rounded-xs">
            Accessories
          </span>
        </div>
        <button className="w-full bg-secondary py-2 text-lg text-white rounded-md text-center my-6">
          Display
        </button>
      </div>
    </div>
  );
}

export default Filter;
