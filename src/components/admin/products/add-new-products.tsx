"use client";
import React, { useEffect, useState } from "react";
import ImageUploader from "./add-image-section";
import ProductDetails from "./add-product-details-section";
import ProductSize from "./add-product-size-section";
import { getCategories } from "@/lib/fetchCategories";

function AddNewProducts({
  setAddNewProduct,
  setProductTabs,
}: {
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setProductTabs: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        console.log(`Fetched categories: ${JSON.stringify(data)}`);
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  return (
    <div
      className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10"
      onClick={() => setAddNewProduct(false)}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg relative z-[1000]"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="bg-secondary py-2 text-lg text-white text-center">
          Add New Products
        </h2>
        <div className="px-8">
          {currentPage === 0 && (
            <>
              <h3 className="text-sm font-medium my-3">Categories</h3>
              <select
                name="categories"
                id="categories"
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select a category</option>
                {loading ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>
              <h3 className="text-sm font-medium my-3">Sub categories</h3>
              <select
                name="categories"
                id="categories"
                className="border rounded px-3 py-2 w-full "
              >
                <option value="">Select a subcategory</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
              <h3 className="text-sm font-medium my-3">Types</h3>
              <select
                name="categories"
                id="categories"
                className="border rounded px-3 py-2 w-full "
              >
                <option value="">Select a types</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
                <option value="accessories">Accessories</option>
              </select>
            </>
          )}
          {currentPage === 1 && <ImageUploader maxImages={8} />}
          {currentPage === 2 && <ProductDetails />}
          {currentPage === 3 && <ProductSize />}
          <button
            className="w-full bg-secondary py-2 cursor-pointer text-lg text-white rounded-md text-center mt-6 mb-12"
            onClick={() => {
              if (currentPage !== 3) {
                setCurrentPage(currentPage + 1);
              } else {
                setProductTabs(true);
                setAddNewProduct(false);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNewProducts;
