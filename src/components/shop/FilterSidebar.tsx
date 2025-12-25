"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    router.push(`/shop?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push("/shop");
  };

  return (
    <aside className="w-full md:w-64 bg-gray-900 text-white p-4 rounded-lg space-y-6 sticky top-0">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* Category */}
      <div>
        <label className="block text-sm mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full bg-gray-800 p-2 rounded"
        >
          <option value="">All</option>
          <option value="men">Men</option>
          <option value="women">Women</option>
          <option value="shoes">Shoes</option>
        </select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm mb-1">Price Range</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-gray-800 p-2 rounded"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded font-semibold"
        >
          Apply
        </button>
        <button
          onClick={clearFilters}
          className="flex-1 border border-gray-600 hover:bg-gray-800 py-2 rounded"
        >
          Clear
        </button>
      </div>
    </aside>
  );
}
