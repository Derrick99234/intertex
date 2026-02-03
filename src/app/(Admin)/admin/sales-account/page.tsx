"use client";
import DynamicTable from "@/components/admin/dynamic-table";
import ViewOrder from "@/components/admin/order/view-order";
import DisplayStats from "@/components/display-stats/display-stats";
import React, { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";

function SaleAccountManagement() {
  const sales = [
    {
      checkbox: true,
      no: "01",
      productId: "PRD001",
      productName: "Product 1",
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
    <section className="py-5">
      {viewOrder.status ? (
        <ViewOrder />
      ) : (
        <div>
          <DisplayStats />
          <DynamicTable
            columns={[
              { key: "checkbox", label: "", type: "checkbox" as const },
              { key: "no", label: "NO" },
              { key: "productId", label: "Product ID" },
              { key: "productName", label: "Product Name" },
              { key: "deliveryMethod", label: "Delivery Method" },
              { key: "amount", label: "Amount" },
              { key: "date", label: "Date" },
              { key: "status", label: "Status" },
              { key: "more", label: "More", type: "action" },
            ]}
            data={sales}
            title="All Sales"
            itemsPerPage={5}
            onAction={(id: string) => {
              setViewOrder({
                status: true,
                orderId: id,
              });
            }}
            searchPlaceholder="Search by date, email..."
            showViewAll={false}
          />
        </div>
      )}
    </section>
  );
}

export default SaleAccountManagement;
