import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

export interface ProductVariant {
  id: string;
  size: string;
  quantity: number;
}

function ProductSize({
  sizes,
  setSizes,
  maxVariants = 10,
}: {
  sizes: ProductVariant[];
  setSizes: (variants: ProductVariant[]) => void;
  maxVariants?: number;
}) {
  // const [variants, setVariants] = useState<ProductVariant[]>([
  //   { id: "1", size: "XXL", quantity: 10 },
  // ]);

  const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  const handleSizeChange = (id: string, size: string) => {
    const updated = sizes.map((variant) =>
      variant.id === id ? { ...variant, size } : variant
    );
    setSizes(updated);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updated = sizes.map((variant) =>
      variant.id === id ? { ...variant, quantity } : variant
    );
    setSizes(updated);
  };

  const addNewVariant = () => {
    if (sizes.length >= maxVariants) return;

    const newId = (sizes.length + 1).toString();
    const newVariant: ProductVariant = {
      id: newId,
      size: "S",
      quantity: 1,
    };

    setSizes([...sizes, newVariant]);
  };

  const removeVariant = (id: string) => {
    const updated = sizes.filter((variant) => variant.id !== id);
    setSizes(updated);
  };
  return (
    <div className="space-y-4 pt-5">
      {sizes.map((variant, index) => (
        <div key={variant.id} className="flex items-start space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Products Size
            </label>
            <div className="relative">
              <select
                value={variant.size}
                onChange={(e) => handleSizeChange(variant.id, e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
              >
                {sizeOptions.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="relative">
              <input
                type="number"
                value={variant.quantity}
                onChange={(e) =>
                  handleQuantityChange(
                    variant.id,
                    parseInt(e.target.value) || 0
                  )
                }
                min="0"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex flex-col">
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(variant.id, variant.quantity + 1)
                  }
                  className="px-2 py-1 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleQuantityChange(
                      variant.id,
                      Math.max(0, variant.quantity - 1)
                    )
                  }
                  className="px-2 py-1 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {sizes.length > 1 && (
            <div className="pt-8">
              <button
                onClick={() => removeVariant(variant.id)}
                className="text-red-500 hover:text-red-700 text-xl p-1 cursor-pointer"
                type="button"
              >
                <IoMdClose />
              </button>
            </div>
          )}
        </div>
      ))}

      {sizes.length < maxVariants && (
        <button
          onClick={addNewVariant}
          className="flex cursor-pointer items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium mt-4"
          type="button"
        >
          <span className="text-lg">+</span>
          <span>Add New</span>
        </button>
      )}
    </div>
  );
}

export default ProductSize;
