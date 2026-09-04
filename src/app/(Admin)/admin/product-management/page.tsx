"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import AddNewProducts from "@/components/admin/products/add-new-products";
import ProductTabs from "@/components/admin/products/product-tabs";
import { Product } from "@/components/admin/products/view-product";
import DisplayStats from "@/components/display-stats/display-stats";
import { LoadingSpinner } from "@/components/loading-spinner";
import { NotificationSystem } from "@/components/notification-popup";
import { authFetch } from "@/lib/auth-fetch";
import { getCategories } from "@/lib/fetchCategories";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function ProductManagement() {
  const [viewProduct, setViewProduct] = useState({
    status: false,
    productId: "",
  });
  const [addNewProduct, setAddNewProduct] = React.useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categoriesNav, setCategoriesNav] = useState<{ name: string; href: string }[]>([
    { name: "All Products", href: "all" },
    { name: "Men", href: "men" },
    { name: "Women", href: "women" },
  ]);
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

  const calculateTotalStock = (stock: any) => {
    if (!Array.isArray(stock)) return 0;
    return stock.reduce(
      (sum: number, item: any) => sum + (Number(item?.quantity) || 0),
      0
    );
  };

  const transformProducts = (list: any[]) =>
    list.map((product: any) => ({
      id: product._id,
      productName: product.productName || "N/A",
      category: product?.productType?.name || product?.subcategory?.category?.name || "N/A",
      price: product.price,
      createdAt: product?.createdAt
        ? new Date(product.createdAt).toLocaleDateString("en-GB")
        : "N/A",
      inStock: calculateTotalStock(product.inStock),
      status: "Active",
      more: <IoEyeOutline />,
    }));

  useEffect(() => {
    async function loadCategoryNav() {
      try {
        const cats = await getCategories();
        if (Array.isArray(cats) && cats.length > 0) {
          setCategoriesNav([
            { name: "All Products", href: "all" },
            ...cats.map((c: any) => ({
              name: c.name,
              href: c.slug || c._id,
            })),
          ]);
        }
      } catch {}
    }
    loadCategoryNav();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await authFetch("/products?all=true", {
          refreshPath: "/admin/refresh",
        });
        const raw = await res.json();

        if (!res.ok) throw new Error(raw.message || "Failed to fetch product");

        const list: Product[] =
          raw.products || raw.data || (Array.isArray(raw) ? raw : []);
        setProducts(transformProducts(list));
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
    setIsLoading(true);
    try {
      const endpoint =
        href === "all" ? "/products?all=true" : `/products/category/${href}?all=true`;
      const res = await authFetch(endpoint, {
        refreshPath: "/admin/refresh",
      });
      const raw = await res.json();
      if (!res.ok) throw new Error(raw.message || "Failed to fetch product");

      const list: Product[] =
        raw.products || raw.data || (Array.isArray(raw) ? raw : []);
      setProducts(transformProducts(list));
    } catch (err: any) {
      showNotification(err?.message || "Failed to fetch products", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-5">
      {viewProduct.status ? (
        <ProductTabs
          productId={viewProduct.productId}
          setViewProduct={setViewProduct}
          onProductDeleted={(deletedId) => {
            setProducts((prev) => prev.filter((p) => p.id !== deletedId));
          }}
          onProductUpdated={(updated) => {
            setProducts((prev) =>
              prev.map((p) =>
                p.id === updated._id
                  ? {
                      ...p,
                      id: updated._id,
                      productName: updated.productName || p.productName,
                      category:
                        updated?.productType?.name ||
                        updated?.subcategory?.category?.name ||
                        p.category,
                      price: updated.price,
                      inStock: calculateTotalStock(updated.inStock),
                    }
                  : p
              )
            );
          }}
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
            navigations={categoriesNav}
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
