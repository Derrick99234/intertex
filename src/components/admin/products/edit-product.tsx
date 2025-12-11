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
import { NotificationSystem } from "@/components/notification-popup";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Product } from "./view-product";
import { IoEyeOutline } from "react-icons/io5";
import ImageUploader from "./edit-image-section";

function EditProduct({
  setEditProduct,
  product,
  setProducts,
}: {
  setEditProduct: React.Dispatch<React.SetStateAction<boolean>>;
  product: any;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
}) {
  const [currentPage, setCurrentPage] = useState(0);
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    product?.subcategory.category._id
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState(
    product?.subcategory._id
  );

  const [isLoading, setIsLoading] = useState(false);
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
    productType: product?.productType?._id || "",
    productName: product?.productName || "",
    price: product?.price || "",
    materials: product?.materials || "",
    process: product?.process || "",
    offer: product?.offer || "",
    description: product?.description || "",
    ratings: product?.ratings || "4.6",
    features: product?.features || "",
    inStock: product?.inStock || [{ id: "1", size: "S", quantity: 1 }],
  });

  // LOAD CATEGORIES
  useEffect(() => {
    async function loadCategories() {
      setIsLoading(true);
      try {
        const data = await getCategories();
        setCategories(data);
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
    if (!selectedCategory) return;
    async function loadSubcategories() {
      setIsLoading(true);
      try {
        const data = await getSubCategories(selectedCategory);
        setSubcategories(data);
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
    if (!selectedSubcategory) return;
    async function loadTypes() {
      setIsLoading(true);
      try {
        const data = await getProductTypes(selectedSubcategory);
        setProductTypes(data);
      } catch {
        showNotification("Failed to fetch product types", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadTypes();
  }, [selectedSubcategory]);

  const validateFormFields = () => {
    const missingFields: string[] = [];

    const required = {
      productType: "Product Type",
      productName: "Product Name",
      price: "Price",
      materials: "Materials",
      process: "Process",
      offer: "Offer",
      description: "Description",
      ratings: "Ratings",
      features: "Features",
    };

    // iterate safely over the keys that exist on `required`
    for (const key of Object.keys(required) as Array<keyof typeof required>) {
      const formKey = key as keyof typeof formData;
      const value = formData[formKey];
      if (
        value === undefined ||
        value === null ||
        value.toString().trim() === ""
      ) {
        missingFields.push(required[key]);
      }
    }

    formData.inStock.forEach(
      (stock: { size: string; quantity: number }, i: number) => {
        if (stock.size.trim() === "" || stock.quantity <= 0) {
          missingFields.push(`Stock #${i + 1}`);
        }
      }
    );

    return missingFields;
  };

  // SUBMIT UPDATE
  const handleUpdate = async () => {
    const missing = validateFormFields();
    if (missing.length > 0) {
      showNotification(`Missing fields: ${missing.join(", ")}`, "error");
      return;
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
          // Only append if there is a new file (new upload)
          formDataToSend.append("newImages", img.file); // Append all new images to 'newImages' (for upload)
        }
      });

      // === DELETED IMAGES ===
      imagePreview.forEach((img) => {
        if (img.deleted && img.preview) {
          // If an image is marked for deletion
          formDataToSend.append("deleteImages", img.preview); // Add deleted image URL to 'deleteImages'
        }
      });

      const res = await fetch(`${API_BASE_URL}/products/${product._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        showNotification("Failed to update product", "error");
        return;
      }

      // const { updatedProduct } = await res.json();
      console.log(await res.json());

      console.log(Object.fromEntries(formDataToSend.entries()));

      showNotification("Product updated successfully", "success");

      // UPDATE PRODUCT LIST
      // setProducts((prev) =>
      //   prev.map((p) =>
      //     p._id === product._id
      //       ? {
      //           ...updatedProduct,
      //           id: updatedProduct._id,
      //           inStock: updatedProduct.inStock.length,
      //           category: updatedProduct?.productType?.name,
      //           more: <IoEyeOutline />,
      //           status: "Active",
      //         }
      //       : p
      //   )
      // );

      setTimeout(() => setEditProduct(false), 1500);
    } catch (error) {
      showNotification("Failed to update product", "error");
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
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50">
      <CgClose
        className="text-white text-2xl absolute top-8 right-4 cursor-pointer"
        onClick={() => setEditProduct(false)}
      />

      <div className="bg-white w-full max-w-lg rounded-lg">
        <h2 className="bg-secondary py-2 text-lg text-white text-center">
          Edit Product
        </h2>

        <div className="px-8">
          {/* STEP 1 */}
          {currentPage === 0 && (
            <>
              <h3 className="text-sm font-medium my-3">Category</h3>
              <select
                className="border rounded px-3 py-2 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Select</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <h3 className="text-sm font-medium my-3">Subcategory</h3>
              <select
                className="border rounded px-3 py-2 w-full"
                value={selectedSubcategory}
                onChange={(e) => setSelectedSubcategory(e.target.value)}
              >
                <option value="">Select</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>

              <h3 className="text-sm font-medium my-3">Product Type</h3>
              <select
                className="border rounded px-3 py-2 w-full"
                value={formData.productType}
                onChange={(e) =>
                  setFormData({ ...formData, productType: e.target.value })
                }
              >
                <option value="">Select</option>
                {productTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.name}
                  </option>
                ))}
              </select>
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
          <div className="flex mt-6 mb-12 gap-4">
            {currentPage > 0 && (
              <button
                className="w-full bg-gray-800 py-2 text-white rounded-md"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Back
              </button>
            )}

            <button
              className="w-full bg-secondary py-2 text-white rounded-md"
              onClick={() =>
                currentPage !== 3
                  ? setCurrentPage(currentPage + 1)
                  : handleUpdate()
              }
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
