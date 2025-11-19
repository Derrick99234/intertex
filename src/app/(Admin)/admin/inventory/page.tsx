"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewInventory from "@/components/admin/inventory/view-inventory";
import DisplayStats from "@/components/display-stats/display-stats";
import { API_BASE_URL } from "@/lib/constants";
import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function Inventory() {
  // const inventory = [
  //   {
  //     checkbox: true,
  //     no: "01",
  //     productId: "ORD001",
  //     productName: "Classic T-Shirt",
  //     totalItems: 10,
  //     itemsLeft: 5,
  //     totalSold: 5,
  //     dateAdded: "12-12-2024",
  //     more: <IoEyeOutline />,
  //   },
  // ];
  const [viewOrder, setViewOrder] = useState({
    status: false,
    productId: "",
  });
  const [productTypes, setProductTypes] = useState<any[]>([]);

  const [filteredProductTypes, setFilteredProductTypes] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("all-inventory");

  async function getProductTypes() {
    const res = await fetch(`${API_BASE_URL}/types`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      next: { revalidate: 300 },
    });
    const { data } = await res.json();
    const formatted = data.map((product: any, index: number) => ({
      checkbox: false,
      no: String(index + 1).padStart(2, "0"),
      productId: product._id,
      productName: product.name,
      totalItems: product.totalProducts,
      totalSold: product.totalSold,
      dateAdded: new Date(product.createdAt).toLocaleDateString(),
      more: <IoEyeOutline className="cursor-pointer" />,
    }));
    setProductTypes(formatted);
    console.log(`Fetched Product Type: ${productTypes}`);
  }

  useEffect(() => {
    getProductTypes();
  }, []);

  useEffect(() => {
    let filteredData = productTypes;
    if (activeTab === "low-inventory") {
      // Filter for low inventory (totalProducts <= 5)
      filteredData = productTypes.filter((p) => p.totalItems <= 5);
    }

    setFilteredProductTypes(filteredData);
  }, [productTypes, activeTab]);

  const fetchActiveTab = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <section className="flex mt-20">
      <AdminSidebar />

      <div className="p-5 flex-1 ml-64">
        {viewOrder.status ? (
          <ViewInventory />
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
                // { key: "itemsLeft", label: "Items Left" },
                { key: "totalSold", label: "Total Sold" },
                { key: "dateAdded", label: "Date Added" },
                { key: "more", label: "More", type: "action" },
              ]}
              data={filteredProductTypes}
              title="Orders"
              itemsPerPage={5}
              onAction={(id: string) => {
                setViewOrder({
                  status: true,
                  productId: id,
                });
              }}
              fetchActiveTab={fetchActiveTab}
              searchPlaceholder="Search by date, email..."
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
              // onViewAll={() => console.log("View all users")}
            />
          </div>
        )}
      </div>
    </section>
  );
}

export default Inventory;
