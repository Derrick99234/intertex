"use client";
import AdminSidebar from "@/components/admin/aside/aside";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewOrder from "@/components/admin/order/view-order";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function OrderManagement() {
  const orders = [
    {
      checkbox: true,
      no: "01",
      userId: "USR001",
      orderId: "ORD001",
      deliveryMethod: "pick-up",
      amount: "$300",
      date: "12-12-2024",
      status: "pending",
      more: <IoEyeOutline />,
    },
  ];
  const [viewOrder, setViewOrder] = useState({
    status: false,
    orderId: "",
  });
  return (
    <section className="flex mt-20">
      <AdminSidebar />

      <div className="p-5 flex-1 ml-64">
        {viewOrder.status ? (
          <ViewOrder />
        ) : (
          <div>
            <DisplayStats />
            <DynamicTable
              columns={[
                { key: "checkbox", label: "", type: "checkbox" as const },
                { key: "no", label: "NO" },
                { key: "userId", label: "User ID" },
                { key: "orderId", label: "Order ID" },
                { key: "deliveryMethod", label: "Delivery Method" },
                { key: "amount", label: "Amount" },
                { key: "date", label: "Date" },
                { key: "status", label: "Status" },
                { key: "more", label: "More", type: "action" },
              ]}
              data={orders}
              title="Orders"
              itemsPerPage={5}
              onAction={(id: string) => {
                setViewOrder({
                  status: true,
                  orderId: id,
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

export default OrderManagement;
