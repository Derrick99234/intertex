import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { LuListFilter } from "react-icons/lu";

interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "email" | "date" | "number" | "checkbox";
}

interface TableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
  searchPlaceholder?: string;
  showViewAll?: boolean;
  onViewAll?: () => void;
  itemsPerPage?: number;
}

export default function DynamicTable({
  title,
  columns,
  data,
  searchPlaceholder = "Search...",
  showViewAll = true,
  onViewAll,
  itemsPerPage = 5,
}: TableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const renderCellContent = (item: any, column: TableColumn) => {
    const value = item[column.key];

    switch (column.type) {
      case "email":
        return <span className="text-black">{value}</span>;
      case "checkbox":
        return <input type="checkbox" className="rounded cursor-pointer" />;
      default:
        return <span>{value}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="bg-secondary text-white px-4 py-2 rounded text-sm hover:bg-secondary/80 flex gap-3 justify-center items-center"
          >
            <FiPlus /> {title}
          </button>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-5 items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by date, email..."
                className="border rounded px-3 py-2 pl-8 outline-none w-64 placeholder:text-black"
              />
              <span className="absolute left-2 top-3">
                <CiSearch className="font-bold text-xl" />
              </span>
            </div>
            <button className="flex items-center space-x-1 border rounded px-3 py-2">
              <span className="font-semibold">Filter</span>
              <LuListFilter className="font-bold" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left py-3 px-4 text-sm font-medium text-gray-700"
                  >
                    {column.label}
                  </th>
                ))}
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                  More
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="py-3 px-4 text-sm text-black"
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <button className="text-gray-600 hover:text-gray-800 mr-2 cursor-pointer">
                      <IoEyeOutline />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <span>
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              ←
            </button>
            {Array.from({ length: Math.min(2, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 border rounded  cursor-pointer  ${
                    currentPage === pageNum ? "bg-secondary text-white" : ""
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 2 && <span>...</span>}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
