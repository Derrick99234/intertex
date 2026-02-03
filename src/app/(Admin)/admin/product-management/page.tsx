"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import AddNewProducts from "@/components/admin/products/add-new-products";
import ProductTabs from "@/components/admin/products/product-tabs";
import ViewProduct, { Product } from "@/components/admin/products/view-product";
import DisplayStats from "@/components/display-stats/display-stats";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { API_BASE_URL } from "@/lib/constants";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function ProductManagement() {
  const [productTabs, setProductTabs] = useState(false);
  const [viewProduct, setViewProduct] = useState({
    status: false,
    productId: "",
  });
  const [addNewProduct, setAddNewProduct] = React.useState(false);

  const [products, setProducts] = useState<Product[]>([]);
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
    }, 2000);
  };

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("adminToken");
      setIsLoading(true);

      if (!token) {
        router.push("/admin");
        return;
      }
      try {
        const res = await fetch(`${API_BASE_URL}/products`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const { products, message } = await res.json();

        if (!res.ok) throw new Error(message || "Failed to fetch product");

        const transformedUsers = products.map((product: Product) => ({
          id: product._id,
          // productId: `PRD-${String(index + 1).padStart(4, "0")}`, // or use user._id.slice(-6) etc.
          productName: product.productName || "N/A",
          category: product?.productType?.name,
          price: product.price,
          createdAt: product?.createdAt ? new Date(product.createdAt).toLocaleDateString("en-GB") : "N/A", // adjust format if needed
          inStock: product.inStock.length,
          status: "Active",
          more: <IoEyeOutline />,
        }));
        setProducts(transformedUsers);
      } catch (err: unknown) {
        if (err instanceof Error) {
          showNotification(err.message, "error");
        } else {
          showNotification("An unknown error occurred", "error");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const fetchActiveTab = async (href: string) => {
    if (href === "all") {
      const res = await fetch(`${API_BASE_URL}/products`);
      const { products, message } = await res.json();
      if (!res.ok) throw new Error(message || "Failed to fetch product");

      const transformedUsers = products.map((product: Product) => ({
        id: product._id,
        // productId: `PRD-${String(index + 1).padStart(4, "0")}`, // or use user._id.slice(-6) etc.
        productName: product.productName || "N/A",
        category: product?.productType?.name,
        price: product.price,
        createdAt: product?.createdAt ? new Date(product.createdAt).toLocaleDateString("en-GB") : "N/A", // adjust format if needed
        inStock: product.inStock.length,
        status: "Active",
        more: <IoEyeOutline />,
      }));
      setProducts(transformedUsers);
      return;
    }

    const res = await fetch(`${API_BASE_URL}/products/category/${href}`);
    const { products, message } = await res.json();

    if (!res.ok) throw new Error(message || "Failed to fetch product");

    const transformedUsers = products.map((product: Product) => ({
      _id: product._id,
      productName: product.productName || "N/A",
      category: product?.productType?.name,
      createdAt: product?.createdAt ? new Date(product.createdAt).toLocaleDateString("en-GB") : "N/A", // adjust format if needed
      price: product.price,
      inStock: product.inStock.length,
      status: "Active",
      more: <IoEyeOutline />,
    }));
    setProducts(transformedUsers);
  };

  return (
    <section className="py-5">
      {viewProduct.status ? (
        <ProductTabs
          productId={viewProduct.productId}
          setViewProduct={setViewProduct}
        />
      ) : (
        <>
          <DisplayStats />

          <DynamicTable
            columns={[
              { key: "checkbox", label: "", type: "checkbox" as const },
              { key: "no", label: "NO" },
              { key: "id", label: "ID", type: "id" },
              { key: "productName", label: "Product Name" },
              { key: "category", label: "Category" },
              { key: "price", label: "Price" },
              { key: "inStock", label: "Stock" },
              { key: "createdAt", label: "Date Joined", type: "date" },
              { key: "status", label: "Status" },
              { key: "more", label: "More", type: "action" },
            ]}
            data={products}
            onAction={(id: string) => {
              setViewProduct({
                status: true,
                productId: id,
              });
            }}
            title="Add New Products"
            searchPlaceholder="Search by name, ID..."
            showViewAll={true}
            fetchActiveTab={fetchActiveTab}
            onViewAll={() => setAddNewProduct(true)}
            navigations={[
              {
                name: "All Products",
                href: "all",
              },
              {
                name: "Men",
                href: "men",
              },
              {
                name: "Women",
                href: "women",
              },
            ]}
          />
          {addNewProduct && (
            <AddNewProducts
              setAddNewProduct={setAddNewProduct}
              products={products}
              setProducts={setProducts}
            />
          )}
        </>
      )}
      {notifications.status && (
        <NotificationSystem
          message={notifications.message}
          type={notifications.type as "success" | "error" | "info"}
        />
      )}
      <LoadingSpinner isLoading={isLoading} />
    </section>
  );
}

export default ProductManagement;
