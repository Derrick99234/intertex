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
import { API_BASE_URL } from "@/lib/constants";
import { authFetch } from "@/lib/auth-fetch";
import { NotificationSystem } from "@/components/notification-popup";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Product } from "./view-product";
import { IoEyeOutline } from "react-icons/io5";

function AddNewProducts({
  setAddNewProduct,
  setProducts,
  products,
}: {
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  products: Product[];
}) {
  // const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [inlineError, setInlineError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState({
    status: false,
    message: "",
    type: "info",
  });

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotifications({ message, type, status: true });

    setTimeout(() => {
      setNotifications((prev) => ({ ...prev, status: false }));
    }, 4000);
  };

  const [imagePreview, setImagePreview] = useState([
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
  ]);

  const [formData, setFormData] = useState({
    productType: "",
    productName: "",
    price: "",
    materials: "",
    process: "",
    offer: "",
    description: "",
    ratings: "4.6",
    features: "",
    inStock: [{ id: "1", size: "S", quantity: 1 }],
  });

  useEffect(() => {
    async function loadCategories() {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        showNotification("Failed to fetch categories", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      setSelectedSubcategory("");
      setProductTypes([]);
      setFormData((prev) => ({ ...prev, productType: "" }));
      return;
    }
    setIsLoading(true);
    setSelectedSubcategory("");
    setProductTypes([]);
    setFormData((prev) => ({ ...prev, productType: "" }));

    async function loadSubcategories() {
      try {
        const data = await getSubCategories(selectedCategory);
        setSubcategories(Array.isArray(data) ? data : []);
      } catch (error) {
        showNotification("Failed to fetch subcategories", "error");
      } finally {
        setIsLoading(false);
      }
    }

    loadSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedSubcategory) {
      setProductTypes([]);
      setFormData((prev) => ({ ...prev, productType: "" }));
      return;
    }

    async function loadProductTypes() {
      try {
        setIsLoading(true);
        const data = await getProductTypes(selectedSubcategory);
        setProductTypes(Array.isArray(data) ? data : []);
      } catch (error) {
        showNotification("Failed to fetch product types", "error");
      } finally {
        setIsLoading(false);
      }
    }

    loadProductTypes();
  }, [selectedSubcategory]);

  const validateStep = (step: number): string | null => {
    if (step === 0) {
      if (!selectedCategory) return "Please select a Category.";
      if (!selectedSubcategory) return "Please select a Subcategory.";
      if (!formData.productType) {
        if (!isLoading && productTypes.length === 0) {
          return "The selected subcategory has no product types yet. Please create a Product Type under this subcategory in 'Manage Categories' first.";
        }
        return "Please select a Product Type.";
      }
      return null;
    }
    if (step === 1) {
      const hasImage = imagePreview.some((img) => img.file !== null);
      if (!hasImage) return "Please upload at least one product image.";
      return null;
    }
    if (step === 2) {
      if (!formData.productName.trim()) return "Please enter a product name.";
      if (!String(formData.price).trim() || Number(formData.price) <= 0)
        return "Please enter a valid price greater than 0.";
      if (!formData.materials.trim()) return "Please enter product materials.";
      if (!formData.process.trim()) return "Please enter product process.";
      if (!formData.description.trim()) return "Please enter product description.";
      if (!formData.features.trim()) return "Please enter product features.";
      return null;
    }
    if (step === 3) {
      if (!formData.inStock || formData.inStock.length === 0)
        return "Please add at least one stock variant.";
      for (let i = 0; i < formData.inStock.length; i++) {
        const item = formData.inStock[i];
        if (!item.size || item.size.trim() === "" || Number(item.quantity) <= 0) {
          return `Please provide a valid size and quantity for Stock #${i + 1}.`;
        }
      }
      return null;
    }
    return null;
  };

  const handleSubmit = async () => {
    setInlineError(null);

    // Validate all steps from 0 to 3 before triggering any loading spinner
    for (let s = 0; s <= 3; s++) {
      const err = validateStep(s);
      if (err) {
        setInlineError(err);
        showNotification(err, "error");
        setCurrentPage(s);
        return;
      }
    }

    try {
      setIsLoading(true);
      const formDataToSend = new FormData();

      formDataToSend.append("price", String(Number(formData.price)));
      formDataToSend.append("productName", formData.productName.trim());
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("subcategory", selectedSubcategory);
      formDataToSend.append("ratings", formData.ratings.toString());
      formDataToSend.append("materials", formData.materials.trim());
      formDataToSend.append("process", formData.process.trim());
      formDataToSend.append("offer", formData.offer || "");
      formDataToSend.append("description", formData.description.trim());
      formDataToSend.append("features", formData.features.trim());

      formData.inStock.forEach((stock, index) => {
        formDataToSend.append(`inStock[${index}][size]`, stock.size);
        formDataToSend.append(
          `inStock[${index}][quantity]`,
          String(stock.quantity)
        );
      });

      const uploadedFiles = imagePreview
        .map((img) => img.file)
        .filter((file): file is File => file !== null);

      if (uploadedFiles.length > 0) {
        formDataToSend.append("imageUrl", uploadedFiles[0]);
        uploadedFiles.slice(1).forEach((file) => {
          formDataToSend.append("otherImages", file);
        });
      }

      const res = await authFetch("/products", {
        refreshPath: "/admin/refresh",
        method: "POST",
        headers: {},
        body: formDataToSend,
      });

      const raw = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorMsg =
          raw?.message ||
          (Array.isArray(raw?.errors) ? raw.errors.join(", ") : null) ||
          "Failed to add product";
        setInlineError(errorMsg);
        showNotification(errorMsg, "error");
        return;
      }
      showNotification("Product added successfully", "success");
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const product = raw.product || raw.data || raw;
      const totalUnits = Array.isArray(product?.inStock)
        ? product.inStock.reduce(
            (sum: number, item: any) => sum + (Number(item?.quantity) || 0),
            0
          )
        : 0;
      setProducts((prev) => [
        {
          ...product,
          inStock: totalUnits,
          id: product?._id,
          category:
            product?.productType?.name ||
            product?.subcategory?.category?.name ||
            "N/A",
          status: "Active",
          more: <IoEyeOutline />,
        },
        ...prev,
      ]);
      setAddNewProduct(false);
    } catch (error: any) {
      const errorMsg = error?.message || "Failed to add product";
      setInlineError(errorMsg);
      showNotification(errorMsg, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const inStock = formData.inStock.map((variant, index) => {
    return {
      size: variant.size,
      quantity: variant.quantity,
      id: String(index + 1),
    };
  });

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/50 p-4">
      <CgClose
        className="text-white text-2xl absolute top-8 font-bold right-4 cursor-pointer hover:opacity-80"
        onClick={() => setAddNewProduct(false)}
      />
      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="bg-secondary py-2 text-lg text-white text-center font-medium">
          Add New Product
        </h2>

        {inlineError && (
          <div className="mx-8 mt-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-md flex items-center justify-between">
            <span>{inlineError}</span>
            <button
              type="button"
              onClick={() => setInlineError(null)}
              className="text-red-500 hover:text-red-800 font-bold ml-2 text-sm"
            >
              ✕
            </button>
          </div>
        )}

        <div className="px-8 overflow-y-auto flex-1">
          {currentPage === 0 && (
            <>
              <h3 className="text-sm font-medium my-3">Category</h3>
              <select
                name="categories"
                id="categories"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border rounded px-3 py-2 w-full text-sm outline-none"
              >
                <option value="">Select a category</option>
                {isLoading && categories.length === 0 ? (
                  <option value="">Loading categories...</option>
                ) : (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                )}
              </select>

              <h3 className="text-sm font-medium my-3">Subcategory</h3>
              <select
                name="subcategories"
                id="subcategories"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
                disabled={!selectedCategory}
                className="border rounded px-3 py-2 w-full text-sm outline-none disabled:bg-gray-100"
              >
                <option value="">Select a subcategory</option>
                {isLoading && subcategories.length === 0 ? (
                  <option value="">Loading subcategories...</option>
                ) : (
                  subcategories.map((subcategory) => (
                    <option key={subcategory._id} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))
                )}
              </select>

              <h3 className="text-sm font-medium my-3">Product Type</h3>
              <select
                name="productTypes"
                id="productTypes"
                value={formData.productType}
                onChange={(e) => {
                  setFormData({ ...formData, productType: e.target.value });
                  setInlineError(null);
                }}
                disabled={!selectedSubcategory}
                className="border rounded px-3 py-2 w-full text-sm outline-none disabled:bg-gray-100"
              >
                <option value="">Select a type</option>
                {isLoading && productTypes.length === 0 ? (
                  <option value="">Loading types...</option>
                ) : (
                  productTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))
                )}
              </select>

              {selectedSubcategory && !isLoading && productTypes.length === 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 flex items-start gap-2">
                  <span className="text-sm">⚠️</span>
                  <div>
                    <p className="font-semibold">No product types found for this subcategory</p>
                    <p className="mt-0.5">
                      You must first create a Product Type assigned to this subcategory in{" "}
                      <span className="font-semibold">Manage Categories &rarr; Product Types</span> before adding products here.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {currentPage === 1 && (
            <ImageUploader
              images={imagePreview}
              setImages={(images) => setImagePreview(images)}
            />
          )}

          {currentPage === 2 && (
            <ProductDetails formData={formData} setFormData={setFormData} />
          )}

          {currentPage === 3 && (
            <ProductSize
              sizes={inStock}
              setSizes={(sizes) => setFormData({ ...formData, inStock: sizes })}
            />
          )}

          <div className="flex mt-6 mb-8 gap-4">
            <button
              className={`w-full bg-gray-800 py-2 cursor-pointer text-base text-white rounded-md text-center hover:bg-gray-900 transition-colors ${
                currentPage === 0 ? "hidden" : ""
              }`}
              onClick={() => {
                setInlineError(null);
                if (currentPage > 0) {
                  setCurrentPage(currentPage - 1);
                }
              }}
            >
              Back
            </button>
            <button
              className="w-full bg-secondary py-2 cursor-pointer text-base text-white rounded-md text-center hover:opacity-90 transition-opacity"
              onClick={() => {
                if (currentPage !== 3) {
                  const err = validateStep(currentPage);
                  if (err) {
                    setInlineError(err);
                    showNotification(err, "error");
                    return;
                  }
                  setInlineError(null);
                  setCurrentPage(currentPage + 1);
                } else {
                  handleSubmit();
                }
              }}
            >
              {currentPage === 3 ? "Create Product" : "Next"}
            </button>
          </div>
        </div>
      </div>
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </div>
  );
}

export default AddNewProducts;
