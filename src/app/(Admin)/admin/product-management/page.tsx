"use client";
import AdminSidebar from "@/components/admin/aside/aside";
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
  // const productsData = [
  //   {
  //     checkbox: true,
  //     no: "01",
  //     productId: "PRD001",
  //     productName: "Cotton T-Shirt",
  //     category: "Apparel",
  //     price: "$25.99",
  //     stock: 150,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "02",
  //     productId: "PRD002",
  //     productName: "Denim Jeans",
  //     category: "Apparel",
  //     price: "$59.99",
  //     stock: 75,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "03",
  //     productId: "PRD003",
  //     productName: "Leather Shoes",
  //     category: "Footwear",
  //     price: "$89.99",
  //     stock: 30,
  //     status: "Low Stock",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "04",
  //     productId: "PRD004",
  //     productName: "Silk Scarf",
  //     category: "Accessories",
  //     price: "$19.99",
  //     stock: 200,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "05",
  //     productId: "PRD005",
  //     productName: "Running Sneakers",
  //     category: "Footwear",
  //     price: "$74.99",
  //     stock: 20,
  //     status: "Low Stock",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "06",
  //     productId: "PRD006",
  //     productName: "Leather Wallet",
  //     category: "Accessories",
  //     price: "$39.99",
  //     stock: 0,
  //     status: "Out of Stock",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "07",
  //     productId: "PRD007",
  //     productName: "Graphic Hoodie",
  //     category: "Apparel",
  //     price: "$49.99",
  //     stock: 95,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "08",
  //     productId: "PRD008",
  //     productName: "Baseball Cap",
  //     category: "Accessories",
  //     price: "$15.00",
  //     stock: 300,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "09",
  //     productId: "PRD009",
  //     productName: "Formal Shirt",
  //     category: "Apparel",
  //     price: "$45.00",
  //     stock: 110,
  //     status: "Active",
  //     more: <IoEyeOutline />,
  //   },
  //   {
  //     checkbox: true,
  //     no: "10",
  //     productId: "PRD010",
  //     productName: "Canvas Backpack",
  //     category: "Bags",
  //     price: "$60.00",
  //     stock: 48,
  //     status: "Low Stock",
  //     more: <IoEyeOutline />,
  //   },
  // ];

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
          _id: product._id,
          // productId: `PRD-${String(index + 1).padStart(4, "0")}`, // or use user._id.slice(-6) etc.
          productName: product.productName || "N/A",
          category: product?.productType?.name,
          price: product.price,
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

  return (
    <section className="flex mt-20">
      <AdminSidebar />
      <div className="p-5 flex-1 ml-64">
        {productTabs ? (
          <ProductTabs />
        ) : viewProduct.status ? (
          <ViewProduct productId={viewProduct.productId} />
        ) : (
          <>
            <DisplayStats />

            <DynamicTable
              columns={[
                { key: "checkbox", label: "", type: "checkbox" as const },
                { key: "no", label: "NO" },
                { key: "_id", label: "ID", type: "id" },
                { key: "productName", label: "Product Name" },
                { key: "category", label: "Category" },
                { key: "price", label: "Price" },
                { key: "inStock", label: "Stock" },
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
              // itemProduct={5}
              searchPlaceholder="Search by name, ID..."
              showViewAll={true}
              onViewAll={() => setAddNewProduct(true)}
              navigations={[
                {
                  name: "All Products",
                  href: "/admin/product-management",
                },
                {
                  name: "Men",
                  href: "/admin/products",
                },
                {
                  name: "Women",
                  href: "/admin/products",
                },
                {
                  name: "Kids",
                  href: "/admin/products",
                },
                {
                  name: "Accessories",
                  href: "/admin/products",
                },
              ]}
            />
            {addNewProduct && (
              <AddNewProducts
                setAddNewProduct={setAddNewProduct}
                setProductTabs={setProductTabs}
                products={products}
                setProducts={setProducts}
              />
            )}
          </>
        )}
      </div>
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
