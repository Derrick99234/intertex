"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewInventory from "@/components/admin/inventory/view-inventory";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function Inventory() {
  const inventory = [
    {
      checkbox: true,
      no: "01",
      productId: "ORD001",
      productName: "Classic T-Shirt",
      totalItems: 10,
      itemsLeft: 5,
      totalSold: 5,
      dateAdded: "12-12-2024",
      more: <IoEyeOutline />,
    },
  ];
  const [viewOrder, setViewOrder] = useState({
    status: false,
    productId: "",
  });
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
                { key: "itemsLeft", label: "Items Left" },
                { key: "totalSold", label: "Total Sold" },
                { key: "dateAdded", label: "Date Added" },
                { key: "more", label: "More", type: "action" },
              ]}
              data={inventory}
              title="Orders"
              itemsPerPage={5}
              onAction={(id: string) => {
                setViewOrder({
                  status: true,
                  productId: id,
                });
              }}
              searchPlaceholder="Search by date, email..."
              showViewAll={false}
              navigations={[
                {
                  name: "All Orders",
                  href: "all-order",
                },
                {
                  name: "Pending Orders",
                  href: "pending-orders",
                },
                {
                  name: "Successful orders",
                  href: "succesful-orders",
                },
                {
                  name: "Failed orders",
                  href: "failed-orders",
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
