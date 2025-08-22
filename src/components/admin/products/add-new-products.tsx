"use client";
import React, { useEffect, useState } from "react";
import ImageUploader from "./add-image-section";
import ProductDetails from "./add-product-details-section";
import ProductSize from "./add-product-size-section";
import {
  getCategories,
  getProductTypes,
  getSubCategories,
} from "@/lib/fetchCategories";
import { CgClose } from "react-icons/cg";

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
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const [formData, setFormData] = useState({
    productType: "",
    productName: "",
    price: "",
    material: "",
    process: "",
    offer: "",
    description: "",
    features: "",
    otherImages: [
      {
        id: "1",
        label: "Add Image 1",
        file: null as File | null,
        preview: null as string | null,
      },
      {
        id: "2",
        label: "Add Image 2",
        file: null as File | null,
        preview: null as string | null,
      },
    ],

    inStock: [{ id: "1", size: "S", quantity: 1 }],
  });

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

  useEffect(() => {
    if (!selectedCategory) return;

    async function loadSubcategories() {
      // setLoadingSubcategories(true);
      try {
        const data = await getSubCategories(selectedCategory);
        setSubcategories(data);
      } catch (error) {
        console.error("Failed to fetch subcategories", error);
      } finally {
        // setLoadingSubcategories(false);
      }
    }

    loadSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;

    async function loadProductTypes() {
      // setLoadingProductTypes(true);
      try {
        const data = await getProductTypes(selectedSubcategory);
        setProductTypes(data);
      } catch (error) {
        console.error("Failed to fetch product types", error);
      } finally {
        // setLoadingSubcategories(false);
      }
    }

    loadProductTypes();
  }, [selectedSubcategory]);

  const handleSubmit = async () => {
    try {
      console.log("Submitting product:", formData);

      // const res = await fetch("/api/products", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!res.ok) throw new Error("Failed to add product");
      // const data = await res.json();
      // console.log("Product created:", data);

      // setProductTabs(true);
      // setAddNewProduct(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50 z-10">
      <CgClose
        className="text-white text-2xl absolute top-28 font-bold right-4 cursor-pointer"
        onClick={() => setAddNewProduct(false)}
      />
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
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
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
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                className="border rounded px-3 py-2 w-full "
              >
                <option value="">Select a subcategory</option>
                {loading ? (
                  <option value="">Loading subcategories...</option>
                ) : (
                  subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))
                )}
              </select>
              <h3 className="text-sm font-medium my-3">Types</h3>
              <select
                name="categories"
                id="categories"
                value={formData.productType}
                onChange={(e) =>
                  setFormData({ ...formData, productType: e.target.value })
                }
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Select a types</option>
                {loading ? (
                  <option value="">Loading types...</option>
                ) : (
                  productTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))
                )}
              </select>
            </>
          )}
          {currentPage === 1 && (
            <ImageUploader
              images={formData.otherImages}
              setImages={(images) =>
                setFormData({ ...formData, otherImages: images })
              }
            />
          )}
          {currentPage === 2 && (
            <ProductDetails formData={formData} setFormData={setFormData} />
          )}

          {currentPage === 3 && (
            <ProductSize
              sizes={formData.inStock}
              setSizes={(sizes) => setFormData({ ...formData, inStock: sizes })}
            />
          )}
          <div className="flex mt-6 mb-12 gap-4">
            <button
              className={` w-full bg-gray-800 py-2 cursor-pointer text-lg text-white rounded-md text-center ${
                currentPage === 0 ? "hidden" : ""
              }`}
              onClick={() => {
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Back
            </button>
            <button
              className="w-full bg-secondary py-2 cursor-pointer text-lg text-white rounded-md text-center"
              onClick={() => {
                if (currentPage !== 3) {
                  setCurrentPage(currentPage + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {currentPage === 3 ? "Save" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewProducts;
