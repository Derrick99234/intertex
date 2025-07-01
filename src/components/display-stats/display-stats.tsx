import React from "react";

function DisplayStats() {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4 border p-4 rounded-sm border-gray-200 pr-16 pl-8">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600 font-semibold">
            Display Stats
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Duration</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm">From</span>
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm"
              defaultValue="2021-06-29"
            />
            <span className="text-sm">to</span>
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm"
              defaultValue="2021-07-06"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayStats;
