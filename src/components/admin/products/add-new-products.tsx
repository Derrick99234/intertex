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
import { NotificationSystem } from "@/components/notification-popup";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Product } from "./view-product";

function AddNewProducts({
  setAddNewProduct,
  setProducts,
  products,
}: {
  setAddNewProduct: React.Dispatch<React.SetStateAction<boolean>>;
  setProductTabs: React.Dispatch<React.SetStateAction<boolean>>;
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
        setCategories(data);
      } catch (error) {
        showNotification("Failed to fetch categories", "error");
      } finally {
        setIsLoading(false);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setIsLoading(true);

    async function loadSubcategories() {
      try {
        const data = await getSubCategories(selectedCategory);
        setSubcategories(data);
      } catch (error) {
        showNotification("Failed to fetch subcategories", "error");
      } finally {
        setIsLoading(false);
      }
    }

    loadSubcategories();
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedCategory) return;

    async function loadProductTypes() {
      // setLoadingProductTypes(true);
      try {
        setIsLoading(true);
        const data = await getProductTypes(selectedSubcategory);
        setProductTypes(data);
      } catch (error) {
        showNotification("Failed to fetch product types", "error");
      } finally {
        setIsLoading(false);
      }
    }

    loadProductTypes();
  }, [selectedSubcategory]);

  const validateFormFields = () => {
    const missingFields = [];

    // Check main formData fields
    const requiredFormDataFields = {
      productType: "Product Type",
      productName: "Product Name",
      price: "Price",
      materials: "Materials",
      process: "Process",
      description: "Description",
      features: "Features",
    };

    for (const key in requiredFormDataFields) {
      const typedKey = key as keyof typeof formData;
      if (!formData[typedKey] || formData[typedKey].toString().trim() === "") {
        missingFields.push(
          requiredFormDataFields[key as keyof typeof requiredFormDataFields]
        );
      }
    }

    // Check if at least one image has been selected
    const hasImage = imagePreview.some((img) => img.file !== null);
    if (!hasImage) {
      missingFields.push("At least one image");
    }

    // Check the inStock array for valid size and quantity
    formData.inStock.forEach((stock, index) => {
      if (stock.size.toString().trim() === "" || stock.quantity <= 0) {
        missingFields.push(`Size & Quantity for Stock #${index + 1}`);
      }
    });

    return missingFields;
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const missingFields = validateFormFields();
      if (missingFields.length > 0) {
        const message = `Please fill in all required fields: ${missingFields.join(
          ", "
        )}.`;
        showNotification(message, "error");
        return;
      }
      const formDataToSend = new FormData();

      formDataToSend.append("price", String(Number(formData.price)));
      formDataToSend.append("productName", formData.productName);
      formDataToSend.append("productType", formData.productType);
      formDataToSend.append("ratings", formData.ratings.toString());
      formDataToSend.append("materials", formData.materials);
      formDataToSend.append("process", formData.process);
      formDataToSend.append("offer", formData.offer);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("features", formData.features);
      // formDataToSend.append("inStock", JSON.stringify(formData.inStock));
      formData.inStock.forEach((stock, index) => {
        formDataToSend.append(`inStock[${index}][size]`, stock.size);
        formDataToSend.append(
          `inStock[${index}][quantity]`,
          String(stock.quantity)
        );
      });

      if (imagePreview.length > 0 && imagePreview[0].file) {
        formDataToSend.append("imageUrl", imagePreview[0].file);
        imagePreview.slice(1).forEach((image) => {
          if (image.file) {
            formDataToSend.append("otherImages", image.file);
          }
        });
      }

      const res = await fetch(`${API_BASE_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: formDataToSend,
      });

      if (!res.ok) {
        showNotification("Failed to add product", "error");
        return;
      }
      showNotification("Product added successfully", "success");
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const { product } = await res.json();
      setProducts((prev) => [
        {
          ...product,
          inStock: product.inStock.length,
          category: product?.productType?.name,
          status: "Active",
        },
        ...prev,
      ]);
      // setProductTabs(true);
      setAddNewProduct(false);
    } catch (error) {
      showNotification("Failed to add product", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center fixed top-0 bottom-0 left-0 right-0 bg-black/50">
      <CgClose
        className="text-white text-2xl absolute top-8 font-bold right-4 cursor-pointer"
        onClick={() => setAddNewProduct(false)}
      />
      <div
        className="bg-white w-full max-w-lg rounded-lg"
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
                {isLoading ? (
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
                {isLoading ? (
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
                {isLoading ? (
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
              images={imagePreview}
              setImages={(images) => setImagePreview(images)}
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
