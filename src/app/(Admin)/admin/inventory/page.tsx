"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewInventory from "@/components/admin/inventory/view-inventory";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function Inventory() {
  const [viewInventory, setViewInventory] = useState({
    status: false,
    product: null as any,
  });
  const [productTypes, setProductTypes] = useState<any[]>([]);
  const [filteredProductTypes, setFilteredProductTypes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all-inventory");

  useEffect(() => {
    const getProductTypes = async () => {
      const res = await fetch(`${API_BASE_URL}/types`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        next: { revalidate: 300 },
      });
      const { data } = await res.json();
      const formatted = data.map((product: any, index: number) => ({
        id: product._id,
        checkbox: false,
        no: String(index + 1).padStart(2, "0"),
        productId: product._id,
        productName: product.name,
        totalItems: product.totalProducts,
        totalSold: product.totalSold,
        dateAdded: new Date(product.createdAt).toLocaleDateString("en-GB"),
        more: <IoEyeOutline className="cursor-pointer" />,
        product,
      }));
      setProductTypes(formatted);
    };

    getProductTypes();
  }, []);

  useEffect(() => {
    let filteredData = productTypes;
    if (activeTab === "low-inventory") {
      filteredData = productTypes.filter((product) => product.totalItems <= 5);
    } else if (activeTab === "wishlist") {
      filteredData = [];
    }

    setFilteredProductTypes(filteredData);
  }, [productTypes, activeTab]);

  return (
    <section className="py-5">
      {viewInventory.status ? (
        <ViewInventory
          product={viewInventory.product}
          onBack={() => setViewInventory({ status: false, product: null })}
        />
      ) : (
        <div>
          <DisplayStats />
          <DynamicTable
            columns={[
              { key: "checkbox", label: "", type: "checkbox" as const },
              { key: "no", label: "NO" },
              { key: "productId", label: "Product ID" },
              { key: "productName", label: "Product Name" },
              { key: "totalItems", label: "Total Items" },
              { key: "totalSold", label: "Total Sold" },
              { key: "dateAdded", label: "Date Added" },
              { key: "more", label: "More", type: "action" },
            ]}
            data={filteredProductTypes}
            title="Inventory"
            itemsPerPage={5}
            onAction={(id: string) => {
              const selectedProduct = filteredProductTypes.find(
                (product) => product.id === id
              );
              setViewInventory({
                status: true,
                product: selectedProduct?.product ?? null,
              });
            }}
            fetchActiveTab={setActiveTab}
            searchPlaceholder="Search by product name or ID..."
            showViewAll={false}
            navigations={[
              {
                name: "All Inventory",
                href: "all-inventory",
              },
              {
                name: "Low Inventory",
                href: "low-inventory",
              },
              {
                name: "Wishlist",
                href: "wishlist",
              },
            ]}
          />
        </div>
      )}
    </section>
  );
}

export default Inventory;
