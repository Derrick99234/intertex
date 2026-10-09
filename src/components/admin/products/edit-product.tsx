"use client";
import React, { useEffect, useState } from "react";
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
import ImageUploader from "./edit-image-section";

const getCategoryId = (p: any): string => {
  if (!p) return "";
  const sub = p?.subcategory;
  if (sub && typeof sub === "object") {
    const cat = sub.category;
    if (cat && typeof cat === "object") return String(cat._id || cat.id || "");
    if (typeof cat === "string") return cat;
  }
  return "";
};

const getSubcategoryId = (p: any): string => {
  if (!p) return "";
  const sub = p?.subcategory;
  if (sub && typeof sub === "object") return String(sub._id || sub.id || "");
  if (typeof sub === "string") return sub;
  return "";
};

const getProductTypeId = (p: any): string => {
  if (!p) return "";
  const pt = p?.productType;
  if (pt && typeof pt === "object") return String(pt._id || pt.id || "");
  if (typeof pt === "string") return pt;
  return "";
};

function EditProduct({
  setEditProduct,
  product,
  setProducts,
  onProductUpdated,
}: {
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
  setProducts?: React.Dispatch<React.SetStateAction<any>>;
  onProductUpdated?: (product: any) => void;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(() =>
    getCategoryId(product)
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(() =>
    getSubcategoryId(product)
  );

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
    }, 3000);
  };

  // LOAD EXISTING IMAGES
  const [imagePreview, setImagePreview] = useState([
    {
      id: "1",
      label: "Main Image",
      file: null as File | null,
      preview: product?.imageUrl || null,
      deleted: false,
      isMain: true,
    },
    ...(product?.otherImages || []).map((img: string, index: number) => ({
      id: `${index + 2}`,
      label: `Image ${index + 2}`,
      file: null,
      preview: img,
      deleted: false,
      isMain: false,
    })),
  ]);

  const deleteImage = (id: string) => {
    setImagePreview((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, deleted: true, file: null } : img
      )
    );
  };

  const replaceImage = (id: string, file: File) => {
    setImagePreview((prev) =>
      prev.map((img) =>
        img.id === id
          ? {
              ...img,
              file: file,
              deleted: false,
              preview: file ? URL.createObjectURL(file) : null,
            }
          : img
      )
    );
  };

  // LOAD PRODUCT DATA
  const [formData, setFormData] = useState({
    productType: getProductTypeId(product),
    productName: product?.productName || "",
    price: product?.price ?? "",
    materials: product?.materials || "",
    process: product?.process || "",
    offer: product?.offer || "",
    description: product?.description || "",
    ratings: product?.ratings ? String(product.ratings) : "4.6",
    features: product?.features || "",
    inStock: Array.isArray(product?.inStock) && product.inStock.length > 0
      ? product.inStock
      : [{ id: "1", size: "S", quantity: 1 }],
  });

  // LOAD CATEGORIES
  useEffect(() => {
    async function loadCategories() {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch {
        showNotification("Failed to fetch categories", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  // LOAD SUBCATEGORIES
  useEffect(() => {
    if (!selectedCategory) {
      setSubcategories([]);
      return;
    }
    async function loadSubcategories() {
      setIsLoading(true);
      try {
        const data = await getSubCategories(selectedCategory);
        setSubcategories(Array.isArray(data) ? data : []);
      } catch {
        showNotification("Failed to fetch subcategories", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadSubcategories();
  }, [selectedCategory]);

  // LOAD TYPES
  useEffect(() => {
    if (!selectedSubcategory) {
      setProductTypes([]);
      return;
    }
    async function loadTypes() {
      setIsLoading(true);
      try {
        const data = await getProductTypes(selectedSubcategory);
        setProductTypes(Array.isArray(data) ? data : []);
      } catch {
        showNotification("Failed to fetch product types", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadTypes();
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
      const hasActiveImage = imagePreview.some(
        (img) => !img.deleted && (img.file !== null || (img.preview !== null && img.preview !== ""))
      );
      if (!hasActiveImage) return "At least one active product image is required.";
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

  // SUBMIT UPDATE
  const handleUpdate = async () => {
    setInlineError(null);

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

      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("subcategory", selectedSubcategory);
      formDataToSend.append("price", String(formData.price));
      formDataToSend.append("materials", formData.materials);
      formDataToSend.append("process", formData.process);
      formDataToSend.append("offer", formData.offer);
      formDataToSend.append("ratings", formData.ratings);
      formDataToSend.append("features", formData.features);
      formDataToSend.append("description", formData.description);

      formData.inStock.forEach(
        (stock: { size: string; quantity: number }, index: number) => {
          formDataToSend.append(`inStock[${index}][size]`, stock.size);
          formDataToSend.append(
            `inStock[${index}][quantity]`,
            String(stock.quantity)
          );
        }
      );

      // === NEW IMAGES ===
      imagePreview.forEach((img) => {
        if (img.file) {
          if (img.isMain) {
            formDataToSend.append("imageUrl", img.file);
          } else {
            formDataToSend.append("otherImages", img.file);
          }
        }
      });

      // === DELETED IMAGES ===
      const deletedUrls: string[] = [];
      imagePreview.forEach((img) => {
        if (img.deleted && img.preview) {
          deletedUrls.push(img.preview);
        }
      });
      if (deletedUrls.length > 0) {
        formDataToSend.append("deleteImages", deletedUrls.join(","));
      }

      const res = await authFetch(`/products/${product._id}`, {
        refreshPath: "/admin/refresh",
        method: "PATCH",
        headers: {},
        body: formDataToSend,
      });

      const raw = await res.json().catch(() => ({}));

      if (!res.ok) {
        showNotification(raw?.message || "Failed to update product", "error");
        return;
      }

      const updatedProduct = raw.product || raw.data || raw;

      showNotification("Product updated successfully", "success");

      if (typeof setProducts === "function") {
        setProducts(updatedProduct);
      }
      if (typeof onProductUpdated === "function") {
        onProductUpdated(updatedProduct);
      }

      setTimeout(() => setEditProduct(false), 1200);
    } catch (error: any) {
      showNotification(error?.message || "Failed to update product", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const inStock = formData.inStock.map(
    (
      variant: {
        size: string;
        quantity: number;
      },
      index: number
    ) => {
      return {
        size: variant.size,
        quantity: variant.quantity,
        id: String(index + 1),
      };
    }
  );

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black/50 p-4">
      <CgClose
        className="text-white text-2xl absolute top-8 right-4 cursor-pointer hover:opacity-80"
        onClick={() => setEditProduct(false)}
      />

      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="bg-secondary py-2 text-lg text-white text-center font-medium">
          Edit Product
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
          {/* STEP 1 */}
          {currentPage === 0 && (
            <>
              <h3 className="text-sm font-medium my-3">Category</h3>
              <select
                className="border rounded px-3 py-2 w-full text-sm outline-none"
                value={selectedCategory}
                onChange={(e) => {
                  const newCat = e.target.value;
                  setSelectedCategory(newCat);
                  setSelectedSubcategory("");
                  setSubcategories([]);
                  setProductTypes([]);
                  setFormData((prev) => ({ ...prev, productType: "" }));
                }}
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <h3 className="text-sm font-medium my-3">Subcategory</h3>
              <select
                className="border rounded px-3 py-2 w-full text-sm outline-none disabled:bg-gray-100"
                value={selectedSubcategory}
                disabled={!selectedCategory}
                onChange={(e) => {
                  const newSub = e.target.value;
                  setSelectedSubcategory(newSub);
                  setProductTypes([]);
                  setFormData((prev) => ({ ...prev, productType: "" }));
                }}
              >
                <option value="">Select a subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <h3 className="text-sm font-medium my-3">Product Type</h3>
              <select
                className="border rounded px-3 py-2 w-full text-sm outline-none disabled:bg-gray-100"
                value={formData.productType}
                disabled={!selectedSubcategory}
                onChange={(e) => {
                  setFormData({ ...formData, productType: e.target.value });
                  setInlineError(null);
                }}
              >
                <option value="">Select a type</option>
                {productTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>

              {selectedSubcategory && !isLoading && productTypes.length === 0 && (
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md text-xs text-amber-800 flex items-start gap-2">
                  <span className="text-sm">⚠️</span>
                  <div>
                    <p className="font-semibold">No product types found for this subcategory</p>
                    <p className="mt-0.5">
                      You must first create a Product Type assigned to this subcategory in{" "}
                      <span className="font-semibold">Manage Categories &rarr; Product Types</span> before selecting it here.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* STEP 2 */}
          {currentPage === 1 && (
            <ImageUploader
              images={imagePreview}
              setImages={setImagePreview}
              deleteImage={deleteImage}
              replaceImage={replaceImage}
            />
          )}

          {/* STEP 3 */}
          {currentPage === 2 && (
            <ProductDetails formData={formData} setFormData={setFormData} />
          )}

          {/* STEP 4 */}
          {currentPage === 3 && (
            <ProductSize
              sizes={inStock}
              setSizes={(sizes) => setFormData({ ...formData, inStock: sizes })}
            />
          )}

          {/* NAVIGATION */}
          <div className="flex mt-6 mb-8 gap-4">
            {currentPage > 0 && (
              <button
                className="w-full bg-gray-800 py-2 text-base text-white rounded-md hover:bg-gray-900 transition-colors"
                onClick={() => {
                  setInlineError(null);
                  setCurrentPage(currentPage - 1);
                }}
              >
                Back
              </button>
            )}

            <button
              className="w-full bg-secondary py-2 text-base text-white rounded-md hover:opacity-90 transition-opacity"
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
                  handleUpdate();
                }
              }}
            >
              {currentPage === 3 ? "Update Product" : "Next"}
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

export default EditProduct;
