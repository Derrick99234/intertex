import { useEffect, useMemo, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FiPlus } from "react-icons/fi";
import { LuListFilter } from "react-icons/lu";
import Filter from "./filter";

interface TableColumn {
  key: string;
  label: string;
  type?: "text" | "email" | "date" | "number" | "checkbox" | "action" | "id";
}

interface TableProps {
  title: string;
  columns: TableColumn[];
  data: any[];
  searchPlaceholder?: string;
  showViewAll?: boolean;
  showSearch?: boolean;
  onViewAll?: () => void;
  itemsPerPage?: number;
  onAction: (id: string) => void;
  fetchActiveTab?: (id: string) => void;
  navigations?: {
    name: string;
    href: string;
  }[];
  filterDateKey?: string;
  filterCategoryKey?: string;
  filterCategoryOptions?: string[];
}

type TableFilters = {
  startDate: string;
  endDate: string;
  categories: string[];
} | null;

const toISODateLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseISODateOnlyLocal = (value: string) => {
  const parts = value.split("-");
  if (parts.length !== 3) return null;
  const [year, month, day] = parts.map((p) => Number(p));
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
};

const parseAnyDate = (value: unknown) => {
  if (value instanceof Date) return value;
  if (typeof value === "number" && Number.isFinite(value)) return new Date(value);
  if (typeof value !== "string") return null;

  const raw = value.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
    const d = parseISODateOnlyLocal(raw.slice(0, 10));
    return d ?? null;
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(raw)) {
    const [dd, mm, yyyy] = raw.split("/").map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
    const [dd, mm, yyyy] = raw.split("-").map(Number);
    return new Date(yyyy, mm - 1, dd);
  }

  const fallback = new Date(raw);
  if (Number.isNaN(fallback.getTime())) return null;
  return fallback;
};

const startOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate());

const endOfDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);

export default function DynamicTable({
  title,
  columns,
  data,
  searchPlaceholder = "Search...",
  showViewAll = true,
  showSearch = true,
  fetchActiveTab,
  onViewAll,
  navigations,
  onAction,
  itemsPerPage = 5,
  filterDateKey,
  filterCategoryKey,
  filterCategoryOptions,
}: TableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tableFilters, setTableFilters] = useState<TableFilters>(null);

  const inferredDateKey = useMemo(() => {
    if (filterDateKey) return filterDateKey;
    const fromType = columns.find((c) => c.type === "date")?.key;
    if (fromType) return fromType;
    const fromName = columns.find((c) => /date/i.test(c.key))?.key;
    if (fromName) return fromName;
    return undefined;
  }, [columns, filterDateKey]);

  const dataAfterAdvancedFilters = useMemo(() => {
    let next = data;

    if (tableFilters?.startDate && tableFilters?.endDate && inferredDateKey) {
      const start = parseISODateOnlyLocal(tableFilters.startDate);
      const end = parseISODateOnlyLocal(tableFilters.endDate);
      if (start && end) {
        const startTime = startOfDay(start).getTime();
        const endTime = endOfDay(end).getTime();
        next = next.filter((item) => {
          const rowDate = parseAnyDate(item?.[inferredDateKey]);
          if (!rowDate) return false;
          const t = rowDate.getTime();
          return t >= startTime && t <= endTime;
        });
      }
    }

    if (
      tableFilters?.categories &&
      tableFilters.categories.length > 0 &&
      filterCategoryKey
    ) {
      const selected = new Set(tableFilters.categories);
      next = next.filter((item) => selected.has(String(item?.[filterCategoryKey])));
    }

    return next;
  }, [data, filterCategoryKey, inferredDateKey, tableFilters]);

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return dataAfterAdvancedFilters;
    return dataAfterAdvancedFilters.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(term)
      )
    );
  }, [dataAfterAdvancedFilters, searchTerm]);

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
      case "id":
        return <span className="font-mono text-black">{value}</span>;
      case "action":
        return (
          <button
            className="text-gray-600 hover:text-gray-800 mr-2 cursor-pointer"
            onClick={() => onAction(item.id)}
          >
            {value}
          </button>
        );
      case "checkbox":
        return <input type="checkbox" className="rounded cursor-pointer" />;
      default:
        return <span>{value}</span>;
    }
  };

  const [activeTab, setActiveTab] = useState(
    navigations && navigations[0].href
  );

  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, tableFilters, itemsPerPage, data.length]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex gap-5 font-semibold text-lg">
          {navigations ? (
            <>
              {navigations.map((nav, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveTab(nav.href);
                    fetchActiveTab?.(nav.href);
                  }}
                  className={`border border-secondary py-1 rounded-sm text-secondary px-4 text-sm cursor-pointer ${
                    activeTab === nav.href ? "bg-secondary text-white" : ""
                  }`}
                >
                  {nav.name}
                </button>
              ))}
            </>
          ) : (
            <span className="text-secondary">{title}</span>
          )}
        </div>
        {showViewAll && (
          <button
            onClick={onViewAll}
            className="bg-secondary text-white px-4 py-2 rounded text-sm hover:bg-secondary/80 flex gap-3 justify-center items-center cursor-pointer"
          >
            <FiPlus /> {title}
          </button>
        )}
      </div>

      <div className="p-4">
        {showSearch && (
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-5 items-center">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm} // bind the input value to searchTerm state
                  onChange={(e) => setSearchTerm(e.target.value)} // update searchTerm on change
                  placeholder={searchPlaceholder}
                  className="border rounded px-3 py-2 pl-8 outline-none w-64 placeholder:text-black"
                />
                <span className="absolute left-2 top-3">
                  <CiSearch className="font-bold text-xl" />
                </span>
              </div>
              <button
                className="flex items-center space-x-1 border rounded px-3 py-2 cursor-pointer"
                onClick={() => setShowFilter(!showFilter)}
              >
                <span className="font-semibold">Filter</span>
                <LuListFilter className="font-bold" />
              </button>
            </div>
          </div>
        )}

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
                  className={`px-3 py-1 border rounded cursor-pointer  ${
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
      {showFilter && (
        <Filter
          setShowFilter={setShowFilter}
          defaultStartDate={
            tableFilters?.startDate ??
            (() => {
              const end = new Date();
              const start = new Date();
              start.setDate(end.getDate() - 7);
              return toISODateLocal(start);
            })()
          }
          defaultEndDate={tableFilters?.endDate ?? toISODateLocal(new Date())}
          defaultCategories={tableFilters?.categories ?? []}
          categoryOptions={filterCategoryOptions}
          onClear={() => setTableFilters(null)}
          onApply={({ startDate, endDate, categories }) =>
            setTableFilters({
              startDate,
              endDate,
              categories,
            })
          }
        />
      )}
    </div>
  );
}
